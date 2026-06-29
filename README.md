# Chaveamento Interativo da Copa do Mundo 2026

Bracket (mata-mata) visual e interativo da Copa do Mundo FIFA 2026, alimentado
em tempo real pela API pública da ESPN. As seis fases do mata-mata
(16-avos → final) são exibidas no estilo de uma chave clássica de torneio:
dois lados convergindo para a **Grande Final** ao centro.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (`radix-vega`)
- **Biome** para lint/format
- **dayjs** para datas (locale pt-BR)
- **pnpm** como gerenciador

## Como rodar

```bash
pnpm install
pnpm dev        # ambiente de desenvolvimento (http://localhost:3000)
pnpm build      # build de produção
pnpm start      # servidor de produção
pnpm lint       # Biome
```

Não é necessária nenhuma chave de API — a ESPN é pública.

## Arquitetura

```
src/
├── app/
│   ├── api/
│   │   ├── scoreboard/route.ts        # proxy + cache do chaveamento
│   │   └── summary/[eventId]/route.ts # proxy + cache do detalhe da partida
│   ├── layout.tsx                     # tema escuro, fontes, metadata
│   └── page.tsx                       # Server Component: fetch inicial + SSR
├── components/
│   ├── bracket/                       # Bracket, RoundColumn, MatchCard, conectores, detalhe…
│   └── home/                          # cabeçalho e estado de erro
├── hooks/
│   ├── use-live-bracket.ts            # polling do scoreboard
│   └── use-match-summary.ts           # fetch do detalhe ao abrir o painel
└── lib/
    ├── bracket-topology.ts            # topologia fixa da árvore (slots e ligações)
    └── espn/
        ├── types.ts                   # tipos das respostas cruas da ESPN
        ├── model.ts                   # modelo normalizado do app (Match, TeamSlot…)
        ├── client.ts                  # cliente da API com cache (revalidate)
        ├── normalize.ts               # scoreboard cru → Bracket
        └── normalize-summary.ts       # summary cru → MatchSummary
```

### Topologia do bracket

A estrutura da árvore das seis fases é **fixa e conhecida**, definida em
[`src/lib/bracket-topology.ts`](src/lib/bracket-topology.ts). Em vez de fixar
IDs de evento, o app numera os jogos de cada fase de 1 a N pela ordem crescente
do `event.id` da ESPN e usa as ligações oficiais (capturadas dos rótulos
placeholder, ex.: `"Round of 32 3 Winner"`) para conectar cada slot ao
seguinte. As colunas são ordenadas em pares adjacentes, o que permite desenhar
os conectores em "cotovelo" apenas com CSS.

Slots ainda não definidos (`team.isActive === false`) são renderizados como
"A definir" e substituídos automaticamente pela seleção real quando o jogo de
origem termina.

## Estratégia de atualização ao vivo

- O **Server Component** (`page.tsx`) faz o fetch inicial e renderiza o
  chaveamento no servidor (sem CORS, com cache curto).
- Os **Route Handlers** fazem proxy da ESPN com `revalidate: 30` e
  `Cache-Control: s-maxage=30, stale-while-revalidate=60`.
- No client, [`use-live-bracket`](src/hooks/use-live-bracket.ts) faz polling do
  `/api/scoreboard`:
  - a cada **45s** quando há jogo ao vivo, e a cada **90s** caso contrário;
  - ao retornar para a aba (`visibilitychange`) força uma atualização;
  - placar e cronômetro atualizam sozinhos, com animação sutil quando um placar
    muda. Um indicador "X ao vivo" pulsa no topo.

## Painel de detalhes

Ao clicar em um confronto abre-se um modal com abas:

- **Escalações** — formação (ex.: `4-2-3-1`) e titulares/reservas com número e
  posição (`/summary` → `rosters`).
- **Lances** — timeline minuto-a-minuto, com gols destacados (`keyEvents`).
- **Ficha** — estádio, público e árbitro (`gameInfo`).
- **Retrospecto** — confrontos diretos (`headToHeadGames`).

## Tratamento de erros e cache

- Toda chamada à ESPN tem cache via `next: { revalidate }`.
- Os Route Handlers retornam `502` com mensagem em caso de falha da ESPN e
  `400` para IDs inválidos.
- Falha no fetch inicial renderiza um estado de erro com botão "Tentar
  novamente"; o painel de detalhes tem estados de carregamento e de erro.

> Projeto independente, sem vínculo com a FIFA. Dados via API pública da ESPN.
