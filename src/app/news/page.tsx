import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/Cards";
import { latestNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "Latest GTA 6 news, trailers, and official updates.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <SectionHeader title="Latest News" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {latestNews.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
