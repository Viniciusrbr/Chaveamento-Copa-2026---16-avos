"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type BracketErrorProps = {
  message: string;
  title?: string;
};

export function BracketError({
  message,
  title = "Não foi possível carregar o chaveamento",
}: BracketErrorProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  function handleRetry() {
    setIsRetrying(true);
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-live/15 text-live">
        <TriangleAlert className="size-6" />
      </span>
      <div className="space-y-1">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <Button onClick={handleRetry} disabled={isRetrying}>
        <RefreshCw className={isRetrying ? "animate-spin" : undefined} />
        Tentar novamente
      </Button>
    </div>
  );
}
