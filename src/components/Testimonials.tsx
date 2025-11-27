import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
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
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from adventurers who've experienced the thrill with Okwambi Rentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
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
