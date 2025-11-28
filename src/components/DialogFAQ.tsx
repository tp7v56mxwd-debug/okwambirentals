import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DialogFAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {t('faq.title1')} <span className="text-primary">{t('faq.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground">{t('faq.description')}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {(t('faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-2 border-border rounded-2xl px-6 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg data-[state=open]:border-primary/50 data-[state=open]:shadow-xl"
          >
            <AccordionTrigger className="text-left hover:no-underline py-6 group">
              <span className="font-bold text-lg text-foreground pr-4 group-hover:text-primary transition-colors">
                {faq.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-foreground/90 pb-6 pt-2 leading-relaxed text-base">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-lg mb-2">Ainda tem dúvidas?</h4>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Entre em contacto connosco através do WhatsApp ou formulário de contacto. A nossa equipa está pronta para ajudar!
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/244923456789" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                WhatsApp
              </a>
              <a href="#contact" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogFAQ;
