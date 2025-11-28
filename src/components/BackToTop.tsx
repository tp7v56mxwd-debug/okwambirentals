import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-14 h-14 rounded-full shadow-luxury hover:shadow-glow transition-all duration-300 hover:scale-110 animate-fade-in p-0"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </>
  );
};

export default BackToTop;
