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
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('faq.title1')} {t('faq.title2')}</h2>
        <p className="text-muted-foreground">{t('faq.description')}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {(t('faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-lg px-4"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              <span className="font-semibold">{faq.q}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DialogFAQ;
