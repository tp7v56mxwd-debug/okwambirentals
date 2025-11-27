import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Testimonials = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  
  const testimonials = [
    {
      name: "João Silva",
      location: "Luanda",
      rating: 5,
      text: "Amazing experience! The jet ski was in perfect condition and the staff was incredibly helpful. Mussulo has never been more fun!",
      date: "2 weeks ago"
    },
    {
      name: "Maria Santos",
      location: "Viana",
      rating: 5,
      text: "Best quad bike rental in Luanda! Professional service, fair prices, and the vehicles are well-maintained. Highly recommend!",
      date: "1 month ago"
    },
    {
      name: "Pedro Costa",
      location: "Talatona",
      rating: 5,
      text: "Rented a buggy for a family day at Mussulo. The booking process was smooth and the experience was unforgettable. Will definitely return!",
      date: "3 weeks ago"
    },
    {
      name: "Ana Ferreira",
      location: "Benfica",
      rating: 5,
      text: "Exceptional service from start to finish. The team made sure we had everything we needed for a safe and exciting adventure.",
      date: "1 week ago"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('testimonials.badge')}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            {t('testimonials.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">{t('testimonials.title2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:shadow-luxury transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-6 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Quote className="w-4 h-4 text-accent" strokeWidth={2} />
                </div>
                
                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" strokeWidth={0} />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="pt-4 border-t border-border/50">
                  <p className="font-display font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
