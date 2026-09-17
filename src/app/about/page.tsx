import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how GTA6Base covers Grand Theft Auto VI news, characters, vehicles, and locations.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "About" }]} />
      <header className="border-b border-border pb-7">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About GTA6Base
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          GTA6Base is an independent fan publication and reference database for
          Grand Theft Auto VI.
        </p>
      </header>

      <div className="policy-content mt-8 space-y-8">
        <section>
          <h2>What we cover</h2>
          <p>
            The site brings GTA 6 news and structured database entries together
            in one place. Coverage includes official announcements, trailers,
            characters, vehicles, locations, and the details that connect them.
            The goal is a useful archive that remains easy to browse as Rockstar
            releases more information.
          </p>
        </section>

        <section>
          <h2>How we approach information</h2>
          <p>
            Official Rockstar and Take-Two material is the starting point.
            Trailer observations are described as observations, analysis is not
            presented as confirmation, and rumors remain labeled until reliable
            evidence changes their status.
          </p>
          <p>
            We add context and organization instead of copying another
            publication&apos;s reporting. Our{" "}
            <Link href="/editorial-policy">Editorial Policy</Link> explains the
            source hierarchy, labels, attribution, and correction process.
          </p>
        </section>

        <section>
          <h2>Independence and ownership</h2>
          <p>
            GTA6Base is unofficial and is not affiliated with, endorsed by, or
            sponsored by Rockstar Games or Take-Two Interactive. Grand Theft
            Auto, Rockstar Games, related marks, and promotional materials
            belong to their respective owners.
          </p>
          <p>
            Advertising helps support site operation but does not purchase
            editorial outcomes. Commercial relationships are covered by our{" "}
            <Link href="/disclosure">Advertising & Affiliate Disclosure</Link>.
          </p>
        </section>

        <section>
          <h2>Corrections and contact</h2>
          <p>
            Have a source-backed correction, rights-holder concern, or business
            inquiry? Use the <Link href="/contact">Contact page</Link> and
            include the relevant URL so the request can be reviewed efficiently.
          </p>
        </section>
      </div>
    </article>
  );
}
