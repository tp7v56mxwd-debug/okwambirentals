import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long")
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string
      };

      contactSchema.parse(data);

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible."
      });

      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary/10 text-primary font-bold text-sm tracking-wider rounded-full border border-primary/20">
                START YOUR ADVENTURE
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Book Your Adventure
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Ready to unleash your Wambi spirit? Let's make it happen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Location</h3>
                  <p className="text-muted-foreground text-lg">Mussulo Peninsula, Luanda, Angola</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Phone</h3>
                  <p className="text-muted-foreground text-lg">+244 XXX XXX XXX</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Email</h3>
                  <p className="text-muted-foreground text-lg">info@okwambirentals.com</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 rounded-2xl bg-card border-2 border-border/50">
                <h4 className="font-bold text-lg mb-3 text-foreground">Operating Hours</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Sunday: 8:00 AM - 6:00 PM</p>
                  <p className="text-sm">Peak season hours may vary</p>
                </div>
              </div>
            </div>
            
            <form className="space-y-5 bg-card p-8 rounded-2xl shadow-xl border-2 border-border/50" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Your Name</label>
                <Input name="name" placeholder="John Doe" className="bg-background h-12 text-base" required maxLength={100} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Your Email</label>
                <Input name="email" type="email" placeholder="john@example.com" className="bg-background h-12 text-base" required maxLength={255} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Subject</label>
                <Input name="subject" placeholder="Rental Inquiry" className="bg-background h-12 text-base" required maxLength={200} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Your Message</label>
                <Textarea name="message" placeholder="Tell us about your adventure plans..." rows={5} className="bg-background text-base" required maxLength={1000} />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
