import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/news", label: "News" },
      { href: "/leaks", label: "Leaks" },
      { href: "/database", label: "Database" },
      { href: "/map", label: "Map" },
    ],
  },
  {
    title: "Database",
    links: [
      { href: "/characters", label: "Characters" },
      { href: "/vehicles", label: "Vehicles" },
      { href: "/locations", label: "Locations" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/subscribe", label: "Subscribe" },
      { href: "/advertise", label: "Advertise" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/disclosure", label: "Affiliate disclosure" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mb-16 border-t border-border bg-muted/60 md:mb-0">
      <div className="mx-auto max-w-[1450px] space-y-10 px-4 py-12 lg:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Logo />
          <p className="max-w-xl text-sm text-muted-foreground">
            GTA6Base is an unofficial fan database and blog. Not affiliated with
            Rockstar Games or Take-Two Interactive.
          </p>
        </div>
      </div>
    </footer>
  );
}
