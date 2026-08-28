import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { login } from "./actions";
import { getAdminUser } from "@/lib/cms/auth";

const errorMessages: Record<string, string> = {
  missing: "Enter your email and password.",
  invalid: "Invalid email or password.",
  forbidden: "This account does not have CMS access.",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const admin = await getAdminUser();

  if (admin) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const message = error ? errorMessages[error] : undefined;

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(24,150,254,0.2),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(255,45,106,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_32px_100px_rgba(0,0,0,0.45)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#0c2039] via-[#102947] to-[#0a1729] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Private workspace
            </div>
            <h2 className="mt-8 max-w-sm font-display text-6xl leading-[0.9] tracking-tight">
              Publish with confidence.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Your internal home for creating, reviewing, and publishing
              GTA6Base coverage.
            </p>
          </div>

          <div className="relative flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-white/50">
            <LockKeyhole className="h-4 w-4 text-primary" />
            Authorized accounts only
          </div>
        </section>

        <section className="p-7 sm:p-10 lg:p-12">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            GTA6Base CMS
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign in to manage your editorial workspace.
          </p>

          <form action={login} className="mt-8 space-y-5">
            {message ? (
              <p
                role="alert"
                className="rounded-xl border border-accent/15 bg-accent/8 px-4 py-3 text-sm font-medium text-accent"
              >
                {message}
              </p>
            ) : null}

            <label className="group block space-y-2">
              <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                Email address
              </span>
              <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="group block space-y-2">
              <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <button
              type="submit"
              className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
            >
              Sign in
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Protected by Supabase authentication
          </p>
        </section>
      </div>
    </div>
  );
}
