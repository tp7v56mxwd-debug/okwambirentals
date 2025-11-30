import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { BookingLocationInfo } from "@/components/booking/BookingLocationInfo";
import { BookingPriceDisplay } from "@/components/booking/BookingPriceDisplay";
import { BookingInfoPanel } from "@/components/booking/BookingInfoPanel";

const bookingSchema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  customer_phone: z.string().trim().min(9, "Phone number is too short").max(20, "Phone number is too long"),
  booking_date: z.date({ required_error: "Please select a date" }),
  booking_time: z.string().min(1, "Please select a time"),
  duration: z.number().min(30, "Minimum duration is 30 minutes"),
  vehicle_type: z.string().min(1, "Please select a vehicle"),
  special_requests: z.string().max(500, "Special requests must be less than 500 characters").optional()
});

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleName: string;
  vehiclePrice: string;
  basePricePerHalfHour: number;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const durationOptions = [
  { label: "30 minutes", value: 30, multiplier: 1 },
  { label: "1 hour", value: 60, multiplier: 2 },
  { label: "1.5 hours", value: 90, multiplier: 3 },
  { label: "2 hours", value: 120, multiplier: 4 },
  { label: "3 hours", value: 180, multiplier: 6 },
  { label: "4 hours", value: 240, multiplier: 8 },
  { label: "Full day (6 hours)", value: 360, multiplier: 12 }
];

const vehicles = [
  { name: "Jet Ski Premium", price: "30.000 Kz", basePricePerHalfHour: 30000 },
  { name: "ATV Premium", price: "35.000 Kz", basePricePerHalfHour: 35000 },
  { name: "UTV Premium", price: "45.000 Kz", basePricePerHalfHour: 45000 }
];

export const BookingDialog = ({ open, onOpenChange, vehicleName, vehiclePrice, basePricePerHalfHour }: BookingDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>(vehicleName || "");
  const [currentPrice, setCurrentPrice] = useState(basePricePerHalfHour);
  const { toast } = useToast();

  // Update selected vehicle and price when props change
  useEffect(() => {
    if (vehicleName) {
      setSelectedVehicle(vehicleName);
      setCurrentPrice(basePricePerHalfHour);
    }
  }, [vehicleName, basePricePerHalfHour]);

  const handleVehicleChange = (value: string) => {
    setSelectedVehicle(value);
    const vehicle = vehicles.find(v => v.name === value);
    if (vehicle) {
      setCurrentPrice(vehicle.basePricePerHalfHour);
    }
  };

  const calculateTotalPrice = (durationMinutes: number) => {
    const multiplier = durationOptions.find(d => d.value === durationMinutes)?.multiplier || 1;
    return (currentPrice * multiplier).toLocaleString('en-US', { 
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionStartTime = new Date().toISOString();
    console.log(`[BOOKING_SUBMIT] Started at ${submissionStartTime}`);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        customer_name: formData.get("customer_name") as string,
        customer_phone: formData.get("customer_phone") as string,
        booking_date: date,
        booking_time: formData.get("booking_time") as string,
        duration: duration,
        vehicle_type: selectedVehicle,
        special_requests: formData.get("special_requests") as string
      };

      console.log('[BOOKING_VALIDATION] Starting validation for:', {
        vehicle: selectedVehicle,
        date: date,
        duration: duration,
        hasUser: !!user
      });

      const validated = bookingSchema.parse(data);
      console.log('[BOOKING_VALIDATION] Validation successful');

      const totalPrice = calculateTotalPrice(duration);

      console.log('[BOOKING_DB_INSERT] Attempting database insert');
      const { data: bookingData, error } = await supabase.from("bookings").insert({
        customer_name: validated.customer_name,
        customer_email: null,
        customer_phone: validated.customer_phone,
        vehicle_type: validated.vehicle_type,
        booking_date: format(validated.booking_date, "yyyy-MM-dd"),
        booking_time: validated.booking_time,
        duration: validated.duration,
        total_price: `${totalPrice} Kz`,
        special_requests: validated.special_requests || "",
        status: "pending",
        user_id: user?.id || null
      }).select().single();

      if (error) {
        console.error('[BOOKING_DB_INSERT] Database insert failed:', {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      const bookingId = bookingData?.id;
      console.log(`[BOOKING_DB_INSERT] Success - Booking ID: ${bookingId}`);

      // Send admin notification
      try {
        console.log('[BOOKING_NOTIFY] Invoking notify-admin-booking function');
        const notifyResponse = await supabase.functions.invoke("notify-admin-booking", {
          body: {
            customerName: validated.customer_name,
            customerPhone: validated.customer_phone,
            vehicleType: validated.vehicle_type,
            bookingDate: format(validated.booking_date, "MMM dd, yyyy"),
            bookingTime: validated.booking_time,
            duration: validated.duration,
            totalPrice: `${totalPrice} Kz`,
            bookingId: bookingId || "unknown",
          },
        });

        if (notifyResponse.error) {
          console.error('[BOOKING_NOTIFY] Edge function returned error:', {
            error: notifyResponse.error,
            bookingId: bookingId
          });
        } else {
          console.log('[BOOKING_NOTIFY] Admin notification sent successfully');
        }
      } catch (notifyError: any) {
        console.error('[BOOKING_NOTIFY] Failed to send admin notification:', {
          error: notifyError.message || notifyError,
          stack: notifyError.stack,
          bookingId: bookingId
        });
        // Don't fail the booking if notification fails
      }

      const submissionEndTime = new Date().toISOString();
      console.log(`[BOOKING_SUBMIT] Completed successfully at ${submissionEndTime}`, {
        bookingId: bookingId,
        totalDuration: `${Date.parse(submissionEndTime) - Date.parse(submissionStartTime)}ms`
      });

      // Generate WhatsApp confirmation message
      const phoneNumber = "447477963492";
      const message = `🎉 *Reserva Confirmada - Okwambi Rentals*\n\n` +
        `Olá ${validated.customer_name}!\n\n` +
        `Sua reserva foi realizada com sucesso:\n\n` +
        `🏍️ Veículo: ${validated.vehicle_type}\n` +
        `📅 Data: ${format(validated.booking_date, 'dd/MM/yyyy')}\n` +
        `⏰ Horário: ${validated.booking_time}\n` +
        `⏱️ Duração: ${validated.duration} minutos\n` +
        `💰 Total: ${totalPrice} Kz\n\n` +
        `📞 Telefone: ${validated.customer_phone}\n` +
        (validated.special_requests ? `📝 Observações: ${validated.special_requests}\n\n` : '\n') +
        `📍 Local: Praia do Mussulo, Luanda\n\n` +
        `Entraremos em contato em breve para confirmar todos os detalhes.\n\n` +
        `Obrigado por escolher Okwambi Rentals! 🏖️`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      console.log('[WHATSAPP] Sending to: +44 7477 963492');

      // Show success message
      toast({
        title: "🎉 Reserva Confirmada!",
        description: "Sua reserva foi criada com sucesso. Abrindo WhatsApp...",
        duration: 5000,
      });

      // Close dialog
      onOpenChange(false);

      // Open WhatsApp with confirmation message after a brief delay
      console.log('[WHATSAPP] Opening WhatsApp URL:', whatsappUrl);
      setTimeout(() => {
        const whatsappWindow = window.open(whatsappUrl, '_blank');
        if (!whatsappWindow) {
          console.error('[WHATSAPP] Pop-up was blocked by browser');
          toast({
            title: "⚠️ Pop-up Bloqueado",
            description: "Por favor, permita pop-ups e clique no botão abaixo para abrir o WhatsApp.",
            duration: 10000,
          });
          // Fallback: try to open in same window
          window.location.href = whatsappUrl;
        } else {
          console.log('[WHATSAPP] WhatsApp opened successfully');
        }
      }, 500);

      // Redirect to confirmation page
      if (bookingId) {
        setTimeout(() => {
          navigate(`/booking/${bookingId}`);
        }, 2000);
      }
    } catch (error) {
      console.error('[BOOKING_SUBMIT] Booking submission failed:', {
        error: error,
        errorType: error instanceof z.ZodError ? 'VALIDATION' : 'UNKNOWN',
        timestamp: new Date().toISOString(),
        vehicle: selectedVehicle,
        date: date,
        duration: duration
      });

      if (error instanceof z.ZodError) {
        console.error('[BOOKING_VALIDATION] Validation errors:', error.errors);
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else if (error && typeof error === 'object' && 'code' in error) {
        // Database error
        console.error('[BOOKING_DB_ERROR] Database error details:', {
          message: (error as any).message,
          code: (error as any).code,
          details: (error as any).details
        });
        toast({
          title: "Booking Failed",
          description: "Unable to save booking. Please try again or contact support.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Booking Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto pointer-events-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-foreground">
            {selectedVehicle ? `Book Your ${selectedVehicle}` : t('fleet.bookNow')}
          </DialogTitle>
          <BookingLocationInfo />
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Vehicle Selector - Only show if no vehicle pre-selected */}
            {!vehicleName && (
              <div>
                <Label htmlFor="vehicle_select">Select Vehicle *</Label>
                <Select value={selectedVehicle} onValueChange={handleVehicleChange} required>
                  <SelectTrigger id="vehicle_select">
                    <SelectValue placeholder="Choose your vehicle" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-[200]">
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.name} value={vehicle.name}>
                        {vehicle.name} - {vehicle.price} per 30min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="customer_name">Full Name</Label>
              <Input
                id="customer_name"
                name="customer_name"
                placeholder="John Doe"
                required
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="customer_phone">Phone Number</Label>
              <Input
                id="customer_phone"
                name="customer_phone"
                type="tel"
                placeholder="+244 123 456 789"
                required
                maxLength={20}
              />
            </div>

            <div>
              <Label>Booking Date</Label>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className={cn(
                      "w-full justify-start text-left font-normal pointer-events-auto",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[200]" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {selectedVehicle && date && (
              <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                <AvailabilityCalendar 
                  selectedDate={date}
                  selectedTime={(document.querySelector('[name="booking_time"]') as HTMLSelectElement)?.value || ""}
                  vehicleType={selectedVehicle}
                />
              </div>
            )}

            <div>
              <Label htmlFor="booking_time">Time Slot</Label>
              <Select name="booking_time" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-background z-[200]">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select 
                name="duration" 
                value={duration.toString()} 
                onValueChange={(value) => setDuration(parseInt(value))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-background z-[200]">
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="special_requests">Special Requests (Optional)</Label>
              <Textarea
                id="special_requests"
                name="special_requests"
                placeholder="Any special requirements or questions?"
                maxLength={500}
                rows={3}
              />
            </div>

            <BookingPriceDisplay 
              currentPrice={currentPrice}
              duration={duration}
              calculateTotalPrice={calculateTotalPrice}
              durationLabel={durationOptions.find(d => d.value === duration)?.label || ""}
            />

            <BookingInfoPanel />
          </div>

          <Button
            type="submit"
            className="w-full text-base py-7 font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
