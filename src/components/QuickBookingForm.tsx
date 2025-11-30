import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calculator } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const QuickBookingForm = () => {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  // Vehicle pricing per day (8 hours)
  const vehiclePrices: Record<string, number> = {
    "ATV": 480000,       // 30.000 Kz per 30min × 16 half-hours
    "Jet Ski": 560000,   // 35.000 Kz per 30min × 16 half-hours
    "UTV": 720000        // 45.000 Kz per 30min × 16 half-hours
  };

  // Calculate total price
  const priceCalculation = useMemo(() => {
    if (!vehicle || !pickup || !returnDate) {
      return null;
    }

    const pickupDateObj = new Date(pickup);
    const returnDateObj = new Date(returnDate);
    
    if (returnDateObj <= pickupDateObj) {
      return null;
    }

    const diffTime = Math.abs(returnDateObj.getTime() - pickupDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const pricePerDay = vehiclePrices[vehicle] || 0;
    const totalPrice = pricePerDay * diffDays;

    return {
      days: diffDays,
      pricePerDay,
      totalPrice,
      formattedTotal: totalPrice.toLocaleString('pt-AO')
    };
  }, [vehicle, pickup, returnDate]);

  const handleWhatsAppBooking = () => {
    const vehicleText = vehicle || "[VEHICLE SELECTED]";
    const pickupText = pickup || "[PICK-UP DATE]";
    const returnText = returnDate || "[RETURN DATE]";
    const locationText = location || "[LOCATION]";
    const nameText = name || "[YOUR NAME]";
    const priceText = priceCalculation 
      ? `\n• Estimated Total: ${priceCalculation.formattedTotal} Kz (${priceCalculation.days} day${priceCalculation.days > 1 ? 's' : ''})`
      : '';

    const message = `Hello Okwambi Rentals, I want to reserve:\n• Vehicle: ${vehicleText}\n• Pick-up date: ${pickupText}\n• Return date: ${returnText}\n• Location: ${locationText}\n• My name: ${nameText}${priceText}\n\nPlease confirm availability and send payment instructions.`;
    
    const whatsappUrl = `https://wa.me/447477963492?text=${encodeURIComponent(message)}`;
    console.log('[QUICK BOOKING] Opening WhatsApp to: +44 7477 963492');
    console.log('[QUICK BOOKING] Message:', message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('quickBooking.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle">{t('quickBooking.vehicleLabel')}</Label>
          <Select value={vehicle} onValueChange={setVehicle}>
            <SelectTrigger id="vehicle">
              <SelectValue placeholder={t('quickBooking.vehiclePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATV">{t('quickBooking.vehicles.atv')}</SelectItem>
              <SelectItem value="Jet Ski">{t('quickBooking.vehicles.jetski')}</SelectItem>
              <SelectItem value="UTV">{t('quickBooking.vehicles.utv')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickup">{t('quickBooking.pickupLabel')}</Label>
          <Input 
            id="pickup" 
            type="date" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="return">{t('quickBooking.returnLabel')}</Label>
          <Input 
            id="return" 
            type="date" 
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">{t('quickBooking.locationLabel')}</Label>
          <Input 
            id="location" 
            placeholder={t('quickBooking.locationPlaceholder')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">{t('quickBooking.nameLabel')}</Label>
          <Input 
            id="name" 
            placeholder={t('quickBooking.namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Price Calculator Display */}
        {priceCalculation && (
          <Alert className="border-primary/20 bg-primary/5">
            <Calculator className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold">{priceCalculation.days} day{priceCalculation.days > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price per day:</span>
                  <span className="font-semibold">{priceCalculation.pricePerDay.toLocaleString('pt-AO')} Kz</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Estimated Total:</span>
                  <span className="text-lg font-bold text-primary">{priceCalculation.formattedTotal} Kz</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * Final price subject to confirmation. Includes 8 hours per day.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {pickup && returnDate && new Date(returnDate) <= new Date(pickup) && (
          <Alert variant="destructive">
            <AlertDescription>
              Return date must be after pick-up date
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleWhatsAppBooking}
          disabled={!vehicle || !pickup || !returnDate || !name}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {t('quickBooking.whatsappButton')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
