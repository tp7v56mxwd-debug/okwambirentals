import { Shield, Award, Clock, ThumbsUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrustBadges = () => {
  const { t } = useTranslation();

  const badges = [
    {
      icon: Shield,
      titlePt: "100% Seguro",
      titleEn: "100% Safe",
      descPt: "Equipamento certificado",
      descEn: "Certified equipment"
    },
    {
      icon: Award,
      titlePt: "5+ Anos",
      titleEn: "5+ Years",
      descPt: "Experiência comprovada",
      descEn: "Proven experience"
    },
    {
      icon: Clock,
      titlePt: "Resposta Rápida",
      titleEn: "Quick Response",
      descPt: "Confirmação em minutos",
      descEn: "Confirmation in minutes"
    },
    {
      icon: ThumbsUp,
      titlePt: "127+ Avaliações",
      titleEn: "127+ Reviews",
      descPt: "Clientes satisfeitos",
      descEn: "Happy customers"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">
              {t("language") === "pt" ? badge.titlePt : badge.titleEn}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("language") === "pt" ? badge.descPt : badge.descEn}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
