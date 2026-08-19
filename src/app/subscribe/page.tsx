import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Subscribe",
};

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8 lg:px-24">
      <SectionHeader title="Subscribe" />
      <p className="mt-3 text-muted-foreground">
        Get the updates that matter — no daily spam.
      </p>
      <form className="mt-6 space-y-3">
        <input
          type="email"
          required
          placeholder="you@email.com"
          className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none ring-primary focus:ring-2"
        />
        <button
          type="submit"
          className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Join the list
        </button>
      </form>
    </div>
  );
}
