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
    <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full mb-6">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">{t('contact.badge')}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            {t('contact.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">{t('contact.title2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="relative bg-gradient-to-br from-card/70 to-card/40 backdrop-blur-xl rounded-3xl p-10 border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.form.name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                  maxLength={100}
                  className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl py-6"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.form.email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                  maxLength={255}
                  className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl py-6"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                  maxLength={200}
                  className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl py-6"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                  maxLength={1000}
                  rows={6}
                  className="bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground font-bold tracking-wide shadow-[0_8px_30px_rgba(var(--primary),0.3)] hover:shadow-[0_12px_40px_rgba(var(--primary),0.5)] transition-all duration-300 hover:-translate-y-1 py-7 rounded-xl group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
