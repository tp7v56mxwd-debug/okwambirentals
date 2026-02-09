import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calculator, Calendar as CalendarIcon, Shield, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const QuickBookingForm = () => {
  const { t } = useTranslation();
  const [bookingType, setBookingType] = useState<"individual" | "package">("individual");
  const [vehicle, setVehicle] = useState("");
  const [packageType, setPackageType] = useState("");
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

  // Package options
  const packageOptions = [
    { 
      id: 'basic', 
      name: t('packages.basic.name'),
      price: 150000, 
      duration: 210, // 3.5 hours in minutes
      durationLabel: "3.5 horas"
    },
    { 
      id: 'premium', 
      name: t('packages.premium.name'),
      price: 250000, 
      duration: 360, // 6 hours in minutes
      durationLabel: "6 horas"
    },
    { 
      id: 'ultimate', 
      name: t('packages.ultimate.name'),
      price: 400000, 
      duration: 600, // 10 hours in minutes
      durationLabel: "10 horas"
    }
  ];

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
    if (bookingType === "package") {
      if (!packageType) return null;
      
      const selectedPackage = packageOptions.find(p => p.id === packageType);
      if (!selectedPackage) return null;

      return {
        basePrice: selectedPackage.price,
        duration: selectedPackage.duration,
        durationLabel: selectedPackage.durationLabel,
        totalPrice: selectedPackage.price,
        formattedTotal: selectedPackage.price.toLocaleString('pt-AO'),
        isPackage: true
      };
    } else {
      if (!vehicle) return null;

      const basePrice = vehiclePrices[vehicle] || 0;
      const multiplier = durationOptions.find(d => d.value === duration)?.multiplier || 1;
      const totalPrice = basePrice * multiplier;

      return {
        basePrice,
        duration,
        totalPrice,
        formattedTotal: totalPrice.toLocaleString('pt-AO'),
        isPackage: false
      };
    }
  }, [bookingType, vehicle, packageType, duration]);

  const handleWhatsAppBooking = () => {
    // Sanitize and validate inputs
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedPhone = phone.trim().slice(0, 20);
    
    if (!sanitizedName || !sanitizedPhone) {
      return; // Prevented by button disabled state, but double-check
    }

    const dateText = date ? format(date, "dd/MM/yyyy") : "";
    const timeText = time;
    const priceText = priceCalculation 
      ? `${priceCalculation.formattedTotal} Kz`
      : '';

    let message = `*Booking Request - Okwambi Rentals*\n\n`;
    
    if (bookingType === "package") {
      const selectedPackage = packageOptions.find(p => p.id === packageType);
      message += `*Package Details:*\n` +
        `- Package: ${selectedPackage?.name}\n` +
        `- Date: ${dateText}\n` +
        `- Time: ${timeText}\n` +
        `- Duration: ${selectedPackage?.durationLabel}\n` +
        `- Total Price: ${priceText}\n\n`;
    } else {
      const vehicleText = vehicle.replace(" Premium", "");
      const durationText = durationOptions.find(d => d.value === duration)?.label || `${duration} minutes`;
      message += `*Vehicle Details:*\n` +
        `- Vehicle: ${vehicleText}\n` +
        `- Date: ${dateText}\n` +
        `- Time: ${timeText}\n` +
        `- Duration: ${durationText}\n` +
        `- Estimated Total: ${priceText}\n\n`;
    }

    message += `*Customer Details:*\n` +
      `- Name: ${sanitizedName}\n` +
      `- Phone: ${sanitizedPhone}\n\n` +
      `Location: Mussulo Peninsula, Luanda\n\n` +
      `Please confirm availability and send payment instructions.`;
    
    console.log("WhatsApp Message:", message);
    const whatsappUrl = `https://wa.me/244951000925?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card id="quick-booking" className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('quickBooking.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Booking Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="bookingType">{t('quickBooking.bookingType')}</Label>
          <Select value={bookingType} onValueChange={(val: "individual" | "package") => {
            setBookingType(val);
            setVehicle("");
            setPackageType("");
          }}>
            <SelectTrigger id="bookingType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="individual">{t('quickBooking.individual')}</SelectItem>
              <SelectItem value="package">{t('quickBooking.package')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vehicle or Package Selection */}
        {bookingType === "individual" ? (
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
        ) : (
          <div className="space-y-2">
            <Label htmlFor="package">{t('quickBooking.packageLabel')}</Label>
            <Select value={packageType} onValueChange={setPackageType}>
              <SelectTrigger id="package">
                <SelectValue placeholder={t('quickBooking.packagePlaceholder')} />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {packageOptions.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.durationLabel} - {pkg.price.toLocaleString('pt-AO')} Kz
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date Selection */}
        <div className="space-y-2">
          <Label>{t('quickBooking.dateLabel')}</Label>
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
                {date ? format(date, "PPP") : <span>{t('quickBooking.dateButton')}</span>}
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

        {/* Availability Calendar - Shows after vehicle/package and date selected */}
        {date && ((bookingType === "individual" && vehicle) || (bookingType === "package" && packageType)) && (
          <div className="space-y-2">
            <Label>{t('quickBooking.availableSlots')}</Label>
            <AvailabilityCalendar 
              selectedDate={date}
              selectedTime={time}
              vehicleType={bookingType === "individual" ? vehicle : packageType || ""}
              onTimeSelect={(selectedTime) => {
                setTime(selectedTime);
                console.log("Time selected:", selectedTime);
              }}
            />
          </div>
        )}

        {/* Time Selection - Alternative method */}
        <div className="space-y-2">
          <Label htmlFor="time">{t('quickBooking.timeLabel')}</Label>
          <Select 
            value={time} 
            onValueChange={setTime} 
            disabled={!date || (bookingType === "individual" ? !vehicle : !packageType)}
          >
            <SelectTrigger id="time">
              <SelectValue placeholder={t('quickBooking.timePlaceholder')} />
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

        {/* Duration Selection - Only for individual vehicles */}
        {bookingType === "individual" && (
          <div className="space-y-2">
            <Label htmlFor="duration">{t('quickBooking.durationLabel')}</Label>
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
        )}

        {/* Price Calculator Display */}
        {priceCalculation && (
          <Alert className="border-primary/20 bg-primary/5">
            <Calculator className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="space-y-2 text-sm">
                {priceCalculation.isPackage ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('quickBooking.priceCalculator.packagePrice')}</span>
                      <span className="font-semibold">{priceCalculation.basePrice.toLocaleString('pt-AO')} Kz</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('quickBooking.priceCalculator.duration')}</span>
                      <span className="font-semibold">{priceCalculation.durationLabel}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('quickBooking.priceCalculator.baseRate')}</span>
                      <span className="font-semibold">{priceCalculation.basePrice.toLocaleString('pt-AO')} Kz</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('quickBooking.priceCalculator.duration')}</span>
                      <span className="font-semibold">{durationOptions.find(d => d.value === duration)?.label}</span>
                    </div>
                  </>
                )}
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{t('quickBooking.priceCalculator.total')}</span>
                  <span className="text-lg font-bold text-primary">{priceCalculation.formattedTotal} Kz</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Insurance Information Section */}
        {priceCalculation && (
          <Alert className="border-muted bg-muted/30">
            <Shield className="h-4 w-4 text-foreground" />
            <AlertDescription>
              <div className="space-y-3 text-sm">
                <div className="font-semibold text-foreground">{t('quickBooking.insurance.title')}</div>
                <p className="text-xs text-muted-foreground">{t('quickBooking.insurance.description')}</p>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-foreground">{t('quickBooking.insurance.basic.name')}</span>
                      <p className="text-xs text-muted-foreground">{t('quickBooking.insurance.basic.description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-foreground">{t('quickBooking.insurance.personal.name')}</span>
                      <p className="text-xs text-muted-foreground">{t('quickBooking.insurance.personal.description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-foreground">{t('quickBooking.insurance.premium.name')}</span>
                      <p className="text-xs text-muted-foreground">{t('quickBooking.insurance.premium.description')}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground italic border-t border-border pt-2 mt-2">
                  {t('quickBooking.insurance.note')}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor="name">{t('quickBooking.nameLabel')}</Label>
            <Input 
              id="name" 
              placeholder={t('quickBooking.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 100))}
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('quickBooking.phoneLabel')}</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder={t('quickBooking.phonePlaceholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value.slice(0, 20))}
              maxLength={20}
              required
            />
          </div>
        </div>

        <Button 
          onClick={handleWhatsAppBooking}
          disabled={
            !date || 
            !time || 
            !name.trim() || 
            !phone.trim() || 
            (bookingType === "individual" ? !vehicle : !packageType)
          }
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {t('quickBooking.whatsappButton')}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {t('quickBooking.whatsappNote')}
        </p>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
