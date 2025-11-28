import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from 'react-i18next';

const DialogFAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-2">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          {t('faq.title1')} <span className="text-primary">{t('faq.title2')}</span>
        </h2>
        <p className="text-muted-foreground">{t('faq.description')}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {(t('faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-lg px-4 bg-card hover:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              <span className="font-bold text-foreground pr-4">{faq.q}</span>
            </AccordionTrigger>
            <AccordionContent className="text-foreground pb-4 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Mais perguntas?</span> Entre em contacto connosco através do WhatsApp ou formulário de contacto.
        </p>
      </div>
    </div>
  );
};

export default DialogFAQ;
