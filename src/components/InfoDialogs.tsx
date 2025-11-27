import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HelpCircle, FileCheck, Shield, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import FAQ from "./FAQ";
import Requirements from "./Requirements";
import SafetyPolicies from "./SafetyPolicies";

type DialogType = "faq" | "requirements" | "safety" | null;

export const InfoDialogs = () => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 group text-foreground/70 hover:text-foreground"
          >
            <span className="relative z-10 flex items-center gap-1">
              {t('nav.info')}
              <ChevronDown className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => setOpenDialog("faq")} className="cursor-pointer">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t('nav.faq')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("requirements")} className="cursor-pointer">
            <FileCheck className="w-4 h-4 mr-2" />
            {t('nav.requirements')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("safety")} className="cursor-pointer">
            <Shield className="w-4 h-4 mr-2" />
            {t('nav.safety')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* FAQ Dialog */}
      <Dialog open={openDialog === "faq"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.faq')}</DialogTitle>
          </DialogHeader>
          <FAQ />
        </DialogContent>
      </Dialog>

      {/* Requirements Dialog */}
      <Dialog open={openDialog === "requirements"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.requirements')}</DialogTitle>
          </DialogHeader>
          <Requirements />
        </DialogContent>
      </Dialog>

      {/* Safety Dialog */}
      <Dialog open={openDialog === "safety"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.safety')}</DialogTitle>
          </DialogHeader>
          <SafetyPolicies />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const MobileInfoDialogs = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  const handleOpenDialog = (type: DialogType) => {
    setOpenDialog(type);
    onClose();
  };

  return (
    <>
      <div className="space-y-1">
        <button
          onClick={() => handleOpenDialog("faq")}
          className="block w-full text-left py-3 px-4 text-sm font-semibold rounded-lg transition-all tracking-wide text-foreground/70 hover:text-foreground hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            {t('nav.faq')}
          </span>
        </button>
        <button
          onClick={() => handleOpenDialog("requirements")}
          className="block w-full text-left py-3 px-4 text-sm font-semibold rounded-lg transition-all tracking-wide text-foreground/70 hover:text-foreground hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            {t('nav.requirements')}
          </span>
        </button>
        <button
          onClick={() => handleOpenDialog("safety")}
          className="block w-full text-left py-3 px-4 text-sm font-semibold rounded-lg transition-all tracking-wide text-foreground/70 hover:text-foreground hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {t('nav.safety')}
          </span>
        </button>
      </div>

      {/* Dialogs */}
      <Dialog open={openDialog === "faq"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.faq')}</DialogTitle>
          </DialogHeader>
          <FAQ />
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "requirements"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.requirements')}</DialogTitle>
          </DialogHeader>
          <Requirements />
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "safety"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.safety')}</DialogTitle>
          </DialogHeader>
          <SafetyPolicies />
        </DialogContent>
      </Dialog>
    </>
  );
};
