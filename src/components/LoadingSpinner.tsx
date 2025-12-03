import { Waves } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
        
        {/* Logo with pulse animation */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <Waves className="w-12 h-12 text-primary animate-pulse" />
        </div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 w-20 h-20">
          <div className="w-full h-full border-2 border-primary/20 rounded-full" />
          <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground tracking-wide">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
