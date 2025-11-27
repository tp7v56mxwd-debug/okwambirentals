import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "244923456789";
  const message = "Hello! I'm interested in renting a vehicle from Okwambi Rentals.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-luxury hover:shadow-glow transition-all duration-300 flex items-center justify-center group hover:scale-110 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 animate-none" strokeWidth={2} />
      <span className="absolute right-20 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-premium">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
