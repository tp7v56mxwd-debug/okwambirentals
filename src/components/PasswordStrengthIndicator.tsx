import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

export const calculatePasswordStrength = (password: string) => {
  const requirements: PasswordRequirement[] = [
    {
      label: "Mínimo de 8 caracteres",
      met: password.length >= 8,
    },
    {
      label: "Uma letra maiúscula",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Uma letra minúscula",
      met: /[a-z]/.test(password),
    },
    {
      label: "Um número",
      met: /\d/.test(password),
    },
    {
      label: "Um caractere especial (!@#$%^&*)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const metCount = requirements.filter((req) => req.met).length;
  const percentage = (metCount / requirements.length) * 100;

  let strength: "weak" | "medium" | "strong" = "weak";
  let color = "bg-destructive";

  if (percentage >= 80) {
    strength = "strong";
    color = "bg-green-500";
  } else if (percentage >= 60) {
    strength = "medium";
    color = "bg-yellow-500";
  }

  return { requirements, strength, percentage, color };
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const { requirements, strength, percentage, color } = calculatePasswordStrength(password);

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-300", color)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium capitalize text-muted-foreground">
          {strength === "weak" && "Fraca"}
          {strength === "medium" && "Média"}
          {strength === "strong" && "Forte"}
        </span>
      </div>

      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <CheckCircle2 className="h-3 w-3 text-green-500" />
            ) : (
              <XCircle className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={cn(
              "transition-colors",
              req.met ? "text-foreground" : "text-muted-foreground"
            )}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
