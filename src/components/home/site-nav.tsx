"use client";

import { CalendarDays, GitFork } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";

type NavLink = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Chaveamento", icon: GitFork },
  { href: "/calendario", label: "Calendário", icon: CalendarDays },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-border bg-card/50 p-1">
      {NAV_LINKS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Button
            key={href}
            asChild
            size="sm"
            variant={isActive ? "secondary" : "ghost"}
            className="rounded-full"
          >
            <Link href={href} aria-current={isActive ? "page" : undefined}>
              <Icon className="size-3.5" />
              {label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
