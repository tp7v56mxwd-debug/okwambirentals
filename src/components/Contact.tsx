import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Ready to book your Mussulo escape? Contact us today
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">Location</h3>
                  <p className="text-muted-foreground">Mussulo Peninsula, Luanda, Angola</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">Phone</h3>
                  <p className="text-muted-foreground">+244 XXX XXX XXX</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                  <p className="text-muted-foreground">info@okwambirentals.com</p>
                </div>
              </div>
            </div>
            
            <form className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
              <Input placeholder="Your Name" className="bg-background" />
              <Input type="email" placeholder="Your Email" className="bg-background" />
              <Input placeholder="Subject" className="bg-background" />
              <Textarea placeholder="Your Message" rows={4} className="bg-background" />
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
