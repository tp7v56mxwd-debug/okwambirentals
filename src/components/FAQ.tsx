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
      answer: "You'll need a valid driver's license (held for at least 2 years), a valid ID or passport, and a credit card for the security deposit."
    },
    {
      question: "What is the minimum age to rent?",
      answer: "The minimum age is 21 years old. Drivers under 25 may be subject to additional fees."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, free cancellation is available up to 24 hours before your booking time. Cancellations within 24 hours are subject to a 50% fee."
    },
    {
      question: "Is fuel included in the rental price?",
      answer: "No, fuel is not included. Vehicles are provided with a full tank and should be returned with a full tank to avoid refueling charges."
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
    <section id="faq" className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <HelpCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about renting with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
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
