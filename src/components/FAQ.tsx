import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What documents do I need to rent a vehicle?",
      answer: "You'll need a valid driver's license or government-issued ID/passport, and a credit card for the security deposit. If you're 16-17 years old or don't have a driver's license, a parental/guardian consent form is required."
    },
    {
      question: "What is the minimum age to rent?",
      answer: "The minimum age is 16 years old. However, if you're 16-17 or don't have a driver's license, you must provide a signed parental/guardian consent form."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, free cancellation is available up to 24 hours before your booking time. Cancellations within 24 hours are subject to a 50% fee."
    },
    {
      question: "Is fuel included in the rental price?",
      answer: "Yes, all our vehicles come with a full fuel tank included in the rental price."
    },
    {
      question: "What happens if the vehicle breaks down?",
      answer: "All our vehicles are regularly maintained. In the unlikely event of a breakdown, contact us immediately and we'll provide roadside assistance or a replacement vehicle."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental subject to availability. Please contact us at least 2 hours before your scheduled return time."
    },
    {
      question: "Are helmets and safety gear provided?",
      answer: "Yes, we provide helmets and basic safety gear for all our vehicles at no additional cost."
    },
    {
      question: "What is covered by insurance?",
      answer: "Basic insurance covers damage to the vehicle and third-party liability. Personal accident insurance is available for an additional fee."
    }
  ];

  return (
    <section id="faq" className="py-32 relative overflow-hidden bg-gradient-to-b from-muted/20 via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">FAQ</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Questions &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">Answers</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Everything you need to know about renting with us
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 rounded-xl px-6 transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 hover:text-primary transition-colors">
                  <span className="font-display text-lg font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
