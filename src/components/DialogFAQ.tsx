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
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {t('faq.title1')} {t('faq.title2')}
        </h2>
        <p className="text-muted-foreground">{t('faq.description')}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {(t('faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline text-left">
              <span className="font-semibold text-base text-foreground pr-4">
                {faq.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-sm text-foreground/80 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-muted/50 border border-border rounded-lg p-5 mt-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm mb-2">Ainda tem dúvidas?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Entre em contacto através do WhatsApp ou formulário de contacto.
            </p>
            <div className="flex gap-2">
              <a href="https://wa.me/244923456789" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
                WhatsApp
              </a>
              <a href="#contact" className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
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
