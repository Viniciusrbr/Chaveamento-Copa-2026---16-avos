"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import type { Match } from "@/lib/espn/model";

type AddToCalendarButtonProps = {
  match: Match;
  compact?: boolean;
};

export function AddToCalendarButton({
  match,
  compact = false,
}: AddToCalendarButtonProps) {
  const href = buildGoogleCalendarUrl(match);

  if (compact) {
    return (
      <Button
        asChild
        variant="ghost"
        size="icon-xs"
        className="text-muted-foreground hover:text-foreground"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Adicionar à agenda"
          title="Adicionar à agenda"
        >
          <CalendarPlus />
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="sm" className="w-fit">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <CalendarPlus />
        Adicionar à agenda
      </a>
    </Button>
  );
}
