import { FeaturedHero } from "@/components/FeaturedHero";
import { HomeSidebar } from "@/components/HomeSidebar";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard, EntityCard } from "@/components/Cards";
import { getHomeNews } from "@/lib/cms/queries";
import { characters, vehicles, leaks } from "@/lib/data";

export default async function HomePage() {
  const { featured, latest } = await getHomeNews();

  return (
    <>
      <div className="mx-auto max-w-[1450px] lg:mt-6">
        <div className="mb-9 h-min w-full items-center gap-6 min-[1200px]:mb-6 min-[1200px]:flex lg:px-24">
          <div className="animate-fade-up">
            <FeaturedHero slides={featured} />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
            <HomeSidebar />
          </div>
        </div>

        <div className="mx-auto max-w-[700px] space-y-10 px-4 pb-8 pt-6 lg:max-w-full lg:gap-8 lg:px-24 lg:pb-16">
          <section className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <SectionHeader title="Latest News" href="/news" />
            <div className="my-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: "160ms" }}>
            <SectionHeader title="Characters" href="/characters" />
            <div className="my-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {characters.map((entity) => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <SectionHeader title="Vehicles" href="/vehicles" />
            <div className="my-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((entity) => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: "240ms" }}>
            <SectionHeader title="Leaks & Rumors" href="/leaks" />
            <div className="my-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {leaks.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>
      </div>

    </>
  );
}
