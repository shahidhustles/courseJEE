"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
    progress: number;        // Percentage complete (0-100)
    variant?: "default" | "success";  // Color variant
    size?: "default" | "sm";         // Size variant
    showPercentage?: boolean;        // Show/hide percentage text
    label?: string;                  // Optional label
    className?: string;             // Custom classes
  }

export function CourseProgress({
  progress,
  variant = "default",
  size = "default",
  showPercentage = true,
  label,
  className,
}: CourseProgressProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        {label && <span className="text-muted-foreground">{label}</span>}
        {showPercentage && (
          <span className="text-muted-foreground font-medium">{progress}%</span>
        )}
      </div>
      <Progress
        value={progress}
        className={cn(
          "h-2 transition-all",
          size === "sm" && "h-1",
          variant === "success" && "[&>div]:bg-emerald-600"
        )}
      />
    </div>
  );
}