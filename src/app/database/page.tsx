import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Database",
  description: "Browse the full GTA 6 database.",
};

const sections = [
  {
    href: "/characters",
    title: "Characters",
    desc: "Protagonists, supporting cast, and confirmed faces.",
    image: "linear-gradient(135deg, #831843, #fb7185)",
  },
  {
    href: "/vehicles",
    title: "Vehicles",
    desc: "Cars, boats, and everything rolling through Leonida.",
    image: "linear-gradient(135deg, #1e293b, #38bdf8)",
  },
  {
    href: "/locations",
    title: "Locations",
    desc: "Cities, towns, keys, and wilderness regions.",
    image: "linear-gradient(135deg, #115e59, #fde68a)",
  },
] as const;

export default function DatabasePage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Database" />
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Wikipedia-style coverage of everything confirmed — and clearly marked
        when it isn’t.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="h-36 w-full transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ backgroundImage: section.image }}
            />
            <div className="space-y-1 p-4">
              <h3 className="font-semibold text-foreground group-hover:text-primary">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground">{section.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
