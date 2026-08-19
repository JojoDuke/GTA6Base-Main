import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { EntityCard } from "@/components/Cards";
import { locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations",
  description: "GTA 6 location database — Vice City, Leonida Keys, and beyond.",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Locations" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </div>
  );
}
