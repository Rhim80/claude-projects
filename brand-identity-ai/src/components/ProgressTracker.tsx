import { Progress } from './ui/progress';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressTracker({ currentStep, totalSteps }: ProgressTrackerProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {currentStep}/{totalSteps} steps
      </span>
      <Progress value={progress} className="w-24" />
    </div>
  );
}