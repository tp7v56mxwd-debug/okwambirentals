export const BookingInfoPanel = () => {
  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
        Important Information
      </h4>
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
  );
};
