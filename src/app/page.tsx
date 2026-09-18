import { FeaturedHero } from "@/components/FeaturedHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/Cards";
import { getHomeNews } from "@/lib/cms/queries";

export default async function HomePage() {
  const { hero, latest } = await getHomeNews(3);

  return (
    <div className="mx-auto max-w-[1450px] lg:mt-6">
      <div className="mb-9 w-full min-[1200px]:mb-6 lg:px-24">
        <div className="animate-fade-up">
          <FeaturedHero slides={hero} />
        </div>
      </div>

      {latest.length ? (
        <div className="mx-auto max-w-[700px] space-y-10 px-4 pb-8 pt-6 lg:max-w-full lg:gap-8 lg:px-24 lg:pb-16">
          <section className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <SectionHeader title="Latest News" href="/news" />
            <div className="my-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
