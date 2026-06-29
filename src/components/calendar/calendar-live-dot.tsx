import { cn } from "@/lib/utils";

type CalendarLiveDotProps = {
  className?: string;
};

export function CalendarLiveDot({ className }: CalendarLiveDotProps) {
  return (
    <span className={cn("relative flex size-1.5", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
      <span className="relative inline-flex size-full rounded-full bg-live" />
    </span>
  );
}
