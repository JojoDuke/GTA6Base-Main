import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "GTA6Base standards for sourcing, rumor labels, corrections, attribution, and commercial independence.",
};

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      title="Editorial Policy"
      description="Our goal is useful GTA 6 coverage that separates official information, informed analysis, and unverified claims."
    >
      <section>
        <h2>Source standards</h2>
        <p>We prioritize sources in roughly this order:</p>
        <ul>
          <li>
            Official Rockstar Games and Take-Two announcements, trailers,
            filings, store listings, and support pages.
          </li>
          <li>
            Direct statements and primary documents from relevant platforms,
            partners, and regulators.
          </li>
          <li>
            Original reporting from established publications with a record of
            corrections and transparent sourcing.
          </li>
          <li>
            Community research that can be independently checked against
            public material.
          </li>
        </ul>
        <p>
          Anonymous posts, cropped screenshots, and unsourced social claims are
          not treated as confirmation.
        </p>
      </section>

      <section>
        <h2>Confirmed, trailer, and rumored labels</h2>
        <p>
          “Confirmed” means the core fact is supported by an official or
          primary source. “Trailer” means the entry is visibly supported by
          public promotional footage or stills but may not have a full official
          description. “Rumored” means the claim remains unverified and should
          not be read as fact.
        </p>
        <p>
          Analysis and predictions are identified through wording and context.
          We avoid turning speculation into a definitive headline.
        </p>
      </section>

      <section>
        <h2>Originality and attribution</h2>
        <p>
          GTA6Base articles should add original organization, comparison,
          explanation, or commentary. We do not copy articles or lightly
          rewrite another publisher&apos;s reporting. When another outlet
          advances a story, it should be credited clearly.
        </p>
        <p>
          Promotional images and game materials are credited to their owners
          where used. Their inclusion does not imply sponsorship or ownership
          by GTA6Base.
        </p>
      </section>

      <section>
        <h2>Corrections and updates</h2>
        <p>
          We correct material when reliable evidence shows it is inaccurate.
          Minor spelling and formatting fixes may be made silently; meaningful
          factual changes should be reflected in the article or its updated
          context. Old rumors may remain documented when the page clearly
          records that they were disproven.
        </p>
        <p>
          Send a correction with the page URL and supporting source through our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </section>

      <section>
        <h2>Advertising and conflicts</h2>
        <p>
          Advertisers do not decide editorial ratings, rumor labels, or
          corrections. Sponsored material and affiliate links are labeled
          according to our <Link href="/disclosure">Disclosure</Link>.
        </p>
      </section>

      <section>
        <h2>Unofficial status</h2>
        <p>
          GTA6Base is an independent fan publication. We are not affiliated
          with Rockstar Games or Take-Two Interactive, and we do not represent
          access to unreleased game builds or confidential company information.
        </p>
      </section>
    </PolicyPage>
  );
}
