import { Link } from "react-router-dom";
import { ArrowLeft, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogRequirements from "@/components/DialogRequirements";

const RequirementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-8 md:p-12 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Requisitos</h1>
          </div>

          <DialogRequirements />
        </div>
      </div>
    </div>
  );
};

export default RequirementsPage;
