import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";

const COLUMN_COUNTS = [8, 4, 2, 1];

function SkeletonColumn({ count }: { count: number }) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col justify-around",
        BRACKET_METRICS.cardWidth,
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder grid
          key={index}
          className="h-16 w-full rounded-lg"
        />
      ))}
    </div>
  );
}

export function BracketSkeleton() {
  return (
    <div
      className="flex items-stretch gap-7 px-6"
      style={{ height: BRACKET_METRICS.sideHeight }}
    >
      {COLUMN_COUNTS.map((count, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder grid
        <SkeletonColumn key={index} count={count} />
      ))}
      <Skeleton className="h-24 w-60 self-center rounded-lg" />
      {[...COLUMN_COUNTS].reverse().map((count, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder grid
        <SkeletonColumn key={index} count={count} />
      ))}
    </div>
  );
}
