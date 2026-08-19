import Link from "next/link";
import { Newspaper, Database, Flame, User } from "lucide-react";

const items = [
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/database", label: "Database", icon: Database },
  { href: "/leaks", label: "Leaks", icon: Flame },
  { href: "/subscribe", label: "Subscribe", icon: User },
] as const;

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.04)] md:hidden">
      <div className="flex h-16 justify-around">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex h-16 w-full flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
