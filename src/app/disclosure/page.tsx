import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Advertising & Affiliate Disclosure",
  description:
    "How advertising, affiliate links, sponsorships, and editorial independence work on GTA6Base.",
};

export default function DisclosurePage() {
  return (
    <PolicyPage
      title="Advertising & Affiliate Disclosure"
      description="GTA6Base may earn revenue from advertising or clearly identified commercial relationships."
    >
      <section>
        <h2>Advertising</h2>
        <p>
          GTA6Base uses Google AdSense and may use other advertising partners.
          Ads may be selected using contextual information or, where permitted
          and consented to, information about prior browsing activity. Ad
          revenue helps pay for hosting, publishing tools, and continued site
          maintenance.
        </p>
        <p>
          Advertisements are supplied by third parties. Their presence does not
          mean GTA6Base endorses the advertiser, product, service, or claims
          shown in an ad.
        </p>
      </section>

      <section>
        <h2>Affiliate links</h2>
        <p>
          Some future links may be affiliate links. If you follow one and make
          a purchase, GTA6Base may receive a commission at no additional cost
          to you. Articles containing affiliate links will include a clear
          disclosure near the relevant content.
        </p>
        <p>
          At the date shown above, affiliate links are not a primary part of
          the site. This page establishes how they will be disclosed if they are
          introduced.
        </p>
      </section>

      <section>
        <h2>Sponsored content and review independence</h2>
        <p>
          Paid or sponsored material will be labeled clearly. Compensation does
          not guarantee favorable coverage, and advertisers do not receive
          approval over independent editorial conclusions unless an article is
          explicitly identified as advertiser-provided content.
        </p>
      </section>

      <section>
        <h2>Editorial separation</h2>
        <p>
          Advertising and commercial considerations do not determine whether a
          rumor is marked confirmed, rumored, or unsupported. Read our{" "}
          <Link href="/editorial-policy">Editorial Policy</Link> for sourcing,
          corrections, and attribution standards.
        </p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          If a commercial relationship appears unclear, please tell us through
          the <Link href="/contact">Contact page</Link> so we can review and
          correct the disclosure.
        </p>
      </section>
    </PolicyPage>
  );
}
