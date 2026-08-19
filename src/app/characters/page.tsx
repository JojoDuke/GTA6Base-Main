import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { EntityCard } from "@/components/Cards";
import { characters } from "@/lib/data";

export const metadata: Metadata = {
  title: "Characters",
  description: "GTA 6 character database — Lucia, Jason, and more.",
};

export default function CharactersPage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Characters" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {characters.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </div>
  );
}
