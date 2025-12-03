import { Waves, Anchor, Ship, Sailboat, Palmtree, Sun, Compass, Navigation, Bike, Car } from "lucide-react";

const logoOptions = [
  { name: "Waves", Icon: Waves, description: "Current - Water themed" },
  { name: "Anchor", Icon: Anchor, description: "Nautical & stable" },
  { name: "Ship", Icon: Ship, description: "Maritime adventure" },
  { name: "Sailboat", Icon: Sailboat, description: "Elegant sailing" },
  { name: "Compass", Icon: Compass, description: "Adventure & exploration" },
  { name: "Navigation", Icon: Navigation, description: "Direction & journey" },
  { name: "Palmtree", Icon: Palmtree, description: "Tropical beach vibe" },
  { name: "Sun", Icon: Sun, description: "Bright & warm" },
];

const LogoOptions = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2">Logo Icon Options</h2>
        <p className="text-muted-foreground mb-6">Choose an icon that best represents Okwambi</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logoOptions.map(({ name, Icon, description }) => (
            <div
              key={name}
              className="group p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="relative w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground">
            <strong>Preview with brand name:</strong>
          </p>
          <div className="flex flex-wrap gap-6 mt-4">
            {logoOptions.slice(0, 4).map(({ name, Icon }) => (
              <div key={name} className="flex items-center gap-2">
                <Icon className="w-8 h-8 text-primary" />
                <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  OKWAMBI
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <p className="mt-6 text-sm text-muted-foreground text-center">
          Tell me which one you prefer and I'll update the logo throughout the site!
        </p>
      </div>
    </div>
  );
};

export default LogoOptions;
