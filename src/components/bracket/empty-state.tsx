import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  hint?: string;
};

export function EmptyState({ icon, title, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-10 text-center">
      <span className="text-muted-foreground/40">{icon}</span>
      <p className="text-sm text-muted-foreground">{title}</p>
      {hint ? (
        <p className="max-w-xs text-xs text-muted-foreground/60">{hint}</p>
      ) : null}
    </div>
  );
}
