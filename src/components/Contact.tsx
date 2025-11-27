import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
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
        title: "Message Sent",
        description: "We'll get back to you within 24 hours."
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
    <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full mb-6">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">Adventure</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Ready to experience the ultimate adventure? Reach out and let's make it happen.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  maxLength={100}
                  className="bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  maxLength={255}
                  className="bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  required
                  maxLength={200}
                  className="bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your adventure plans..."
                  required
                  maxLength={1000}
                  rows={5}
                  className="bg-background/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold tracking-wide shadow-premium hover:shadow-luxury transition-all group"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
