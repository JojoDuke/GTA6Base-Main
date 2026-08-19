"use client";

import Link from "next/link";
import { useState } from "react";
import { sidebarUpdates } from "@/lib/data";

const tabs = ["Updates", "Countdown", "Trending"] as const;

export function HomeSidebar() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Updates");

  return (
    <div className="h-full w-full p-3 pt-0 max-[1199px]:mx-auto max-[1023px]:max-w-[700px] min-[1200px]:w-[434px] lg:p-0">
      <div className="flex h-[390px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm lg:h-[414px]">
        <div className="flex gap-1.5 border-b border-border p-2 sm:gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`h-9 flex-1 rounded-lg text-sm font-semibold transition-colors ${
                tab === item
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-[#ececee]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-3 py-4">
          {tab === "Updates" && (
            <ul className="flex flex-1 flex-col gap-0 overflow-y-auto">
              {sidebarUpdates.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-border/70 py-3 last:border-0"
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === "Countdown" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Targeted window
              </p>
              <p className="font-display text-4xl font-bold tracking-tight text-foreground">
                Autumn 2026
              </p>
              <p className="max-w-[16rem] text-sm text-muted-foreground">
                Unofficial tracker based on Rockstar / Take-Two public comments.
                Not a confirmed date.
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                <span className="h-2 w-2 animate-soft-pulse rounded-full bg-accent" />
                Watching for confirmation
              </span>
            </div>
          )}

          {tab === "Trending" && (
            <ul className="flex flex-1 flex-col">
              {[
                { label: "Lucia", href: "/characters/lucia" },
                { label: "Vice City", href: "/locations/vice-city" },
                { label: "Trailer 2 breakdown", href: "/news/gta-6-trailer-2-everything-we-spotted" },
                { label: "Leonida Keys", href: "/locations/leonida-keys" },
                { label: "Jason", href: "/characters/jason" },
                { label: "Map size claims", href: "/leaks/map-size-claims-ranked" },
              ].map((item, i) => (
                <li
                  key={item.href}
                  className="flex items-center gap-3 border-b border-border/70 py-3 last:border-0"
                >
                  <span className="w-5 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
