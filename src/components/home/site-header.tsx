import { Trophy } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-[110rem] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="eyebrow flex items-center gap-2 text-[0.7rem] text-primary">
            <Trophy className="size-3.5" />
            Copa do Mundo FIFA 2026 · EUA · Canadá · México
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight uppercase sm:text-5xl">
            O caminho até a taça
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Acompanhe o mata-mata em tempo real: 32 confrontos, seis fases e a
            trajetória de cada seleção rumo à final. Toque em qualquer jogo para
            ver escalações, lances e a ficha completa.
          </p>
        </div>
      </div>
    </header>
  );
}
