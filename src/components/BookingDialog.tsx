import { useState, useEffect } from "react";
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

const bookingSchema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  customer_email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
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
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        customer_name: formData.get("customer_name") as string,
        customer_email: formData.get("customer_email") as string,
        customer_phone: formData.get("customer_phone") as string,
        booking_date: date,
        booking_time: formData.get("booking_time") as string,
        duration: duration,
        vehicle_type: selectedVehicle,
        special_requests: formData.get("special_requests") as string
      };

      const validated = bookingSchema.parse(data);

      const totalPrice = calculateTotalPrice(duration);

      const { error } = await supabase.from("bookings").insert({
        customer_name: validated.customer_name,
        customer_email: validated.customer_email,
        customer_phone: validated.customer_phone,
        vehicle_type: validated.vehicle_type,
        booking_date: format(validated.booking_date, "yyyy-MM-dd"),
        booking_time: validated.booking_time,
        duration: validated.duration,
        total_price: `${totalPrice} Kz`,
        special_requests: validated.special_requests || "",
        status: "pending",
        user_id: user?.id || null
      });

      if (error) throw error;

      // Send confirmation email via Edge Function
      try {
        await supabase.functions.invoke("send-booking-confirmation", {
          body: {
            customerName: validated.customer_name,
            customerEmail: validated.customer_email,
            vehicleType: validated.vehicle_type,
            bookingDate: format(validated.booking_date, "MMM dd, yyyy"),
            bookingTime: validated.booking_time,
            duration: validated.duration,
            totalPrice: totalPrice,
          },
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the booking if email fails
      }

      // Send admin notification
      try {
        const bookingId = (await supabase.from("bookings").select("id").eq("customer_email", validated.customer_email).order("created_at", { ascending: false }).limit(1).single()).data?.id;
        
        await supabase.functions.invoke("notify-admin-booking", {
          body: {
            customerName: validated.customer_name,
            customerEmail: validated.customer_email,
            customerPhone: validated.customer_phone,
            vehicleType: validated.vehicle_type,
            bookingDate: format(validated.booking_date, "MMM dd, yyyy"),
            bookingTime: validated.booking_time,
            duration: validated.duration,
            totalPrice: `${totalPrice} Kz`,
            bookingId: bookingId || "unknown",
          },
        });
      } catch (notifyError) {
        console.error("Error sending admin notification:", notifyError);
        // Don't fail the booking if notification fails
      }

      setShowConfirmation(true);
      toast({
        title: "Booking Confirmed!",
        description: "We've received your booking request. You'll receive a confirmation email shortly."
      });

      setTimeout(() => {
        setShowConfirmation(false);
        onOpenChange(false);
        e.currentTarget.reset();
        setDate(undefined);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
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

  if (showConfirmation) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="mb-4 text-6xl">✓</div>
            <h2 className="text-3xl font-black text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Check your email for confirmation details
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-foreground">
            {selectedVehicle ? `Book Your ${selectedVehicle}` : t('fleet.bookNow')}
          </DialogTitle>
          <div className="bg-muted/50 rounded-lg p-4 mt-4 border border-border/30">
            <h4 className="text-sm font-bold text-foreground mb-2">📍 Meeting Location & Hours</h4>
            <p className="text-sm text-muted-foreground mb-1"><strong>Location:</strong> Okwambi Rentals Beach Station, Mussulo Peninsula, Luanda</p>
            <p className="text-sm text-muted-foreground"><strong>Operating Hours:</strong> Daily 9:00 AM - 6:00 PM (Last rental at 5:30 PM)</p>
          </div>
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
              <Label htmlFor="customer_email">Email</Label>
              <Input
                id="customer_email"
                name="customer_email"
                type="email"
                placeholder="john@example.com"
                required
                maxLength={255}
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {selectedVehicle && (
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

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-bold">Base Rate (30 min)</span>
                  <span className="text-foreground font-bold">
                    {currentPrice > 0 ? `${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 3 })} Kz` : '---'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-bold">Duration</span>
                  <span className="text-foreground font-bold">{durationOptions.find(d => d.value === duration)?.label}</span>
                </div>
                <div className="border-t border-border/30 pt-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-bold uppercase">Total Price</p>
                    <p className="text-3xl font-black text-primary">
                      {currentPrice > 0 ? `${calculateTotalPrice(duration)} Kz` : '---'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Important Information</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Security deposit required at check-in (refunded after safe return)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Valid ID and driver's license required (age restrictions apply)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Late returns charged at 2x hourly rate after 15-minute grace period</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Free cancellation up to 24 hours before booking time</span>
                </li>
              </ul>
            </div>
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
