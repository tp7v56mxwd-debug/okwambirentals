import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const QuickBookingForm = () => {
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
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Quick Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle">Vehicle</Label>
          <Select value={vehicle} onValueChange={setVehicle}>
            <SelectTrigger id="vehicle">
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATV">ATV</SelectItem>
              <SelectItem value="Jet Ski">Jet Ski</SelectItem>
              <SelectItem value="UTV">UTV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickup">Pick-up Date</Label>
          <Input 
            id="pickup" 
            type="date" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="return">Return Date</Label>
          <Input 
            id="return" 
            type="date" 
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            placeholder="Pick-up location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input 
            id="name" 
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleWhatsAppBooking}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Reserve on WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
