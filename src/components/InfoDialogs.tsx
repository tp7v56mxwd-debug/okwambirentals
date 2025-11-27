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
            <span className="relative z-10 flex items-center gap-1.5">
              {t('nav.info')}
              <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
            </span>
            <span className="absolute inset-0 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-64 bg-background/98 backdrop-blur-2xl border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-xl p-2 z-[150]"
        >
          <DropdownMenuItem 
            onClick={() => setOpenDialog("faq")} 
            className="cursor-pointer rounded-lg py-3 px-4 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
          >
            <HelpCircle className="w-4 h-4 mr-3" />
            <span>{t('nav.faq')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setOpenDialog("requirements")} 
            className="cursor-pointer rounded-lg py-3 px-4 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
          >
            <FileCheck className="w-4 h-4 mr-3" />
            <span>{t('nav.requirements')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setOpenDialog("safety")} 
            className="cursor-pointer rounded-lg py-3 px-4 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
          >
            <Shield className="w-4 h-4 mr-3" />
            <span>{t('nav.safety')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* FAQ Dialog */}
      <Dialog open={openDialog === "faq"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background z-[200]">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.faq')}</DialogTitle>
          </DialogHeader>
          <FAQ />
        </DialogContent>
      </Dialog>

      {/* Requirements Dialog */}
      <Dialog open={openDialog === "requirements"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background z-[200]">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.requirements')}</DialogTitle>
          </DialogHeader>
          <Requirements />
        </DialogContent>
      </Dialog>

      {/* Safety Dialog */}
      <Dialog open={openDialog === "safety"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background z-[200]">
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
      <div className="space-y-2 px-2">
        <button
          onClick={() => handleOpenDialog("faq")}
          className="block w-full text-left py-3.5 px-5 text-sm font-semibold rounded-xl transition-all tracking-wide text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/80 hover:to-muted/40 group"
        >
          <span className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span>{t('nav.faq')}</span>
          </span>
        </button>
        <button
          onClick={() => handleOpenDialog("requirements")}
          className="block w-full text-left py-3.5 px-5 text-sm font-semibold rounded-xl transition-all tracking-wide text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/80 hover:to-muted/40 group"
        >
          <span className="flex items-center gap-3">
            <FileCheck className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span>{t('nav.requirements')}</span>
          </span>
        </button>
        <button
          onClick={() => handleOpenDialog("safety")}
          className="block w-full text-left py-3.5 px-5 text-sm font-semibold rounded-xl transition-all tracking-wide text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/80 hover:to-muted/40 group"
        >
          <span className="flex items-center gap-3">
            <Shield className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span>{t('nav.safety')}</span>
          </span>
        </button>
      </div>

      {/* Dialogs */}
      <Dialog open={openDialog === "faq"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background z-[200]">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.faq')}</DialogTitle>
          </DialogHeader>
          <FAQ />
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "requirements"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background z-[200]">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.requirements')}</DialogTitle>
          </DialogHeader>
          <Requirements />
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "safety"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background z-[200]">
          <DialogHeader>
            <DialogTitle className="sr-only">{t('nav.safety')}</DialogTitle>
          </DialogHeader>
          <SafetyPolicies />
        </DialogContent>
      </Dialog>
    </>
  );
};
