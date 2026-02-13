import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i < currentStep
                  ? "step-indicator-completed"
                  : i === currentStep
                  ? "step-indicator-active"
                  : "step-indicator-inactive"
              }`}
            >
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="text-xs mt-1.5 text-center max-w-[80px] text-muted-foreground hidden sm:block">
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-8 sm:w-16 mx-1 sm:mx-2 transition-colors ${
                i < currentStep ? "bg-gov-green" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
