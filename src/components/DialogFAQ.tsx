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
    </div>
  );
};

export default DialogFAQ;
