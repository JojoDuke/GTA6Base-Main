import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/Cards";
import { leaks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leaks",
  description: "GTA 6 leaks and rumors — verified context and hype checks.",
};

export default function LeaksPage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Leaks & Rumors" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leaks.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
