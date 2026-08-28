import Link from "next/link";
import { ExternalLink, LogOut, ShieldCheck } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { signOut } from "./actions";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0c2039] text-white shadow-sm transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
              <ShieldCheck className="h-4 w-4 text-primary" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-tight text-foreground">
                GTA6Base
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                CMS
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="group hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground sm:flex"
            >
              View site
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <div className="hidden h-7 w-px bg-slate-200 sm:block" />
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold text-foreground">Admin</p>
              <p className="max-w-48 truncate text-[11px] text-muted-foreground">
                {user.email}
              </p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                aria-label="Sign out"
                className="group flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
              >
                <LogOut className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
