import { Trophy } from "lucide-react";
import { SiteNav } from "./site-nav";

type SiteHeaderProps = {
  title?: string;
  subtitle?: string;
  description?: string;
};

export function SiteHeader({
  title = "Chaveamento da Copa do Mundo 2026",
  subtitle = "O caminho até a taça",
  description = "Acompanhe o mata-mata em tempo real — dos 16-avos à final: 32 confrontos, seis fases e a trajetória de cada seleção rumo ao título. Toque em qualquer jogo para ver escalações, lances e a ficha completa.",
}: SiteHeaderProps) {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-[110rem] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="eyebrow flex items-center gap-2 text-[0.7rem] text-primary">
            <Trophy className="size-3.5" />
            Copa do Mundo FIFA 2026 · EUA · Canadá · México
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight uppercase sm:text-5xl">
            {title}
          </h1>
          <p className="font-display text-lg font-semibold tracking-tight text-primary uppercase">
            {subtitle}
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <SiteNav />
      </div>
    </header>
  );
}
