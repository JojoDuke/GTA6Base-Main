import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Map",
  description: "Interactive Leonida map — coming soon.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Leonida Map" />
      <div
        className="mt-6 flex min-h-[420px] items-center justify-center rounded-lg border border-border"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #042f2e 0%, #0ea5e9 45%, #fbbf24 100%)",
        }}
      >
        <div className="rounded-lg bg-white/90 px-6 py-4 text-center shadow-sm backdrop-blur">
          <p className="font-display text-2xl font-bold tracking-wide text-foreground">
            Interactive map coming soon
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Marker layers for cities, missions teases, and trailer spots.
          </p>
        </div>
      </div>
    </div>
  );
}
