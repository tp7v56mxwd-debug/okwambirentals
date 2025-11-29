import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BookingDialog } from "./BookingDialog";

const StickyBookingBar = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past hero section
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-2xl border-t border-primary-foreground/10 animate-fade-in">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">
                {t("language") === "pt" 
                  ? "Pronto para a aventura?" 
                  : "Ready for adventure?"}
              </p>
              <p className="text-xs opacity-80">
                {t("language") === "pt" 
                  ? "Reserve agora e garanta seu horário" 
                  : "Book now and secure your spot"}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="secondary"
                className="flex-1 md:flex-none"
                onClick={() => setBookingOpen(true)}
              >
                {t("hero.reserveNow")}
              </Button>
              <a href="tel:+244923456789">
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        vehicleName=""
        vehiclePrice=""
        basePricePerHalfHour={0}
      />
    </>
  );
};

export default StickyBookingBar;
