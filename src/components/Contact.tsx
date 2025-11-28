import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Contact = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const contactSchema = z.object({
    name: z.string().trim().min(2, t('contact.validation.nameMin')).max(100, t('contact.validation.nameMax')),
    email: z.string().trim().email(t('contact.validation.emailInvalid')).max(255, t('contact.validation.emailMax')),
    subject: z.string().trim().min(3, t('contact.validation.subjectMin')).max(200, t('contact.validation.subjectMax')),
    message: z.string().trim().min(10, t('contact.validation.messageMin')).max(1000, t('contact.validation.messageMax'))
  });

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
        title: t('contact.toast.success'),
        description: t('contact.toast.successDesc')
      });

      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('contact.toast.error'),
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: t('contact.toast.error'),
          description: t('contact.toast.errorDesc'),
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-background border-t border-border">
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('contact.title1')}
          </h2>
          <p className="text-muted-foreground">
            {t('contact.description')}
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="border border-border bg-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  {t('contact.form.name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                  maxLength={100}
                  className="border-border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  {t('contact.form.email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                  maxLength={255}
                  className="border-border"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                  maxLength={200}
                  className="border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                  maxLength={1000}
                  rows={5}
                  className="border-border resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
