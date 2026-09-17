import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Advertise",
  description:
    "Advertising and commercial partnership information for GTA6Base.",
};

export default function AdvertisePage() {
  return (
    <PolicyPage
      title="Advertise on GTA6Base"
      description="GTA6Base offers a focused environment for campaigns relevant to gaming and entertainment audiences."
    >
      <section>
        <h2>Advertising availability</h2>
        <p>
          Standard display inventory is supplied through approved advertising
          partners. Direct campaigns, sponsorships, and custom placements are
          considered selectively based on audience fit, visitor experience, and
          compliance requirements.
        </p>
      </section>

      <section>
        <h2>What we will not accept</h2>
        <ul>
          <li>Misleading, deceptive, or malware-linked creative.</li>
          <li>Products or claims prohibited by applicable advertising rules.</li>
          <li>Ads designed to imitate site navigation or editorial content.</li>
          <li>
            Arrangements that require favorable editorial coverage or suppress
            factual corrections.
          </li>
        </ul>
      </section>

      <section>
        <h2>Editorial independence</h2>
        <p>
          Advertising does not purchase a news outcome, database label, or
          editorial endorsement. Sponsored content is identified clearly, and
          commercial relationships follow our{" "}
          <Link href="/disclosure">Advertising & Affiliate Disclosure</Link>.
        </p>
      </section>

      <section>
        <h2>Inquiries</h2>
        <p>
          Visit the <Link href="/contact">Contact page</Link> and use the subject
          line “Advertising.” Include the advertiser, campaign category,
          target dates, intended markets, and proposed format.
        </p>
      </section>
    </PolicyPage>
  );
}
