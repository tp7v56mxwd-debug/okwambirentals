interface BookingPriceDisplayProps {
  currentPrice: number;
  duration: number;
  calculateTotalPrice: (duration: number) => string;
  durationLabel: string;
}

export const BookingPriceDisplay = ({ 
  currentPrice, 
  duration, 
  calculateTotalPrice, 
  durationLabel 
}: BookingPriceDisplayProps) => {
  return (
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
          <span className="text-foreground font-bold">{durationLabel}</span>
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
  );
};
