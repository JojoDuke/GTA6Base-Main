import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { EntityCard } from "@/components/Cards";
import { vehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vehicles",
  description: "GTA 6 vehicle database — cars, boats, and more from Leonida.",
};

export default function VehiclesPage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Vehicles" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </div>
  );
}
