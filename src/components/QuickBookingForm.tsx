import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calculator, Calendar as CalendarIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const QuickBookingForm = () => {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState<number>(30);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Vehicle pricing per 30 minutes (must match database vehicle names)
  const vehiclePrices: Record<string, number> = {
    "ATV Premium": 30000,
    "Jet Ski Premium": 35000,
    "UTV Premium": 45000
  };

  // Time slots (9:00 AM - 5:30 PM)
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // Duration options
  const durationOptions = [
    { label: "30 minutes", value: 30, multiplier: 1 },
    { label: "1 hour", value: 60, multiplier: 2 },
    { label: "1.5 hours", value: 90, multiplier: 3 },
    { label: "2 hours", value: 120, multiplier: 4 },
    { label: "3 hours", value: 180, multiplier: 6 },
    { label: "4 hours", value: 240, multiplier: 8 },
    { label: "Full day (6 hours)", value: 360, multiplier: 12 }
  ];

  // Calculate total price
  const priceCalculation = useMemo(() => {
    if (!vehicle) return null;

    const basePrice = vehiclePrices[vehicle] || 0;
    const multiplier = durationOptions.find(d => d.value === duration)?.multiplier || 1;
    const totalPrice = basePrice * multiplier;

    return {
      basePrice,
      duration,
      totalPrice,
      formattedTotal: totalPrice.toLocaleString('pt-AO')
    };
  }, [vehicle, duration]);

  const handleWhatsAppBooking = () => {
    const vehicleText = vehicle.replace(" Premium", "") || "[VEHICLE]";
    const dateText = date ? format(date, "dd/MM/yyyy") : "[DATE]";
    const timeText = time || "[TIME]";
    const durationText = durationOptions.find(d => d.value === duration)?.label || `${duration} minutes`;
    const nameText = name || "[NAME]";
    const phoneText = phone || "[PHONE]";
    const priceText = priceCalculation 
      ? `${priceCalculation.formattedTotal} Kz`
      : '[PRICE]';

    const message = `🎉 *Booking Request - Okwambi Rentals*\n\n` +
      `*Vehicle Details:*\n` +
      `• Vehicle: ${vehicleText}\n` +
      `• Date: ${dateText}\n` +
      `• Time: ${timeText}\n` +
      `• Duration: ${durationText}\n` +
      `• Estimated Total: ${priceText}\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${nameText}\n` +
      `• Phone: ${phoneText}\n\n` +
      `📍 Location: Mussulo Peninsula, Luanda\n\n` +
      `Please confirm availability and send payment instructions.`;
    
    const whatsappUrl = `https://wa.me/447477963492?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('quickBooking.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Vehicle Selection - Move to top */}
        <div className="space-y-2">
          <Label htmlFor="vehicle">{t('quickBooking.vehicleLabel')}</Label>
          <Select value={vehicle} onValueChange={setVehicle}>
            <SelectTrigger id="vehicle">
              <SelectValue placeholder={t('quickBooking.vehiclePlaceholder')} />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="ATV Premium">ATV</SelectItem>
              <SelectItem value="Jet Ski Premium">Jet Ski</SelectItem>
              <SelectItem value="UTV Premium">UTV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
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
                {date ? format(date, "PPP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Availability Calendar - Shows after vehicle and date selected */}
        {vehicle && date && (
          <div className="space-y-2">
            <Label>Available Time Slots</Label>
            <AvailabilityCalendar 
              selectedDate={date}
              selectedTime={time}
              vehicleType={vehicle}
            />
          </div>
        )}

        {/* Time Selection */}
        <div className="space-y-2">
          <Label htmlFor="time">Select Time Slot</Label>
          <Select value={time} onValueChange={setTime} disabled={!date || !vehicle}>
            <SelectTrigger id="time">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration Selection */}
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select value={duration.toString()} onValueChange={(val) => setDuration(Number(val))}>
            <SelectTrigger id="duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Calculator Display */}
        {priceCalculation && (
          <Alert className="border-primary/20 bg-primary/5">
            <Calculator className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Rate (30 min):</span>
                  <span className="font-semibold">{priceCalculation.basePrice.toLocaleString('pt-AO')} Kz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold">{durationOptions.find(d => d.value === duration)?.label}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Price:</span>
                  <span className="text-lg font-bold text-primary">{priceCalculation.formattedTotal} Kz</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Customer Details */}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor="name">{t('quickBooking.nameLabel')}</Label>
            <Input 
              id="name" 
              placeholder={t('quickBooking.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="+244 123 456 789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={handleWhatsAppBooking}
          disabled={!vehicle || !date || !time || !name || !phone}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Continue to WhatsApp
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          You'll be redirected to WhatsApp to confirm your booking
        </p>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
