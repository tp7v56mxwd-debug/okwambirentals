import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const QuickBookingForm = () => {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  const handleWhatsAppBooking = () => {
    const vehicleText = vehicle || "[VEHICLE SELECTED]";
    const pickupText = pickup || "[PICK-UP DATE]";
    const returnText = returnDate || "[RETURN DATE]";
    const locationText = location || "[LOCATION]";
    const nameText = name || "[YOUR NAME]";

    const message = `Hello Okwambi Rentals, I want to reserve:\n• Vehicle: ${vehicleText}\n• Pick-up date: ${pickupText}\n• Return date: ${returnText}\n• Location: ${locationText}\n• My name: ${nameText}`;
    
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

        <Button 
          onClick={handleWhatsAppBooking}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {t('quickBooking.whatsappButton')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
