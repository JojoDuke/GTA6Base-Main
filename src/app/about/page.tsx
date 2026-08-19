import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-24">
      <SectionHeader title="About GTA6Base" />
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          GTA6Base is a fan-made database and blog for Grand Theft Auto VI —
          mid-2010s gaming blog energy with Wikipedia-style coverage of every
          character, vehicle, location, news update, and leak.
        </p>
        <p>
          It&apos;s also a personal sandbox for learning ads and affiliate
          marketing. Unofficial. Independent. Not affiliated with Rockstar Games
          or Take-Two Interactive.
        </p>
      </div>
    </div>
  );
}
