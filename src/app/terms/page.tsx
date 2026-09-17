import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing access to and use of GTA6Base.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Use"
      description="By accessing GTA6Base, you agree to use the site responsibly and subject to the terms below."
    >
      <section>
        <h2>About GTA6Base</h2>
        <p>
          GTA6Base is an independent, unofficial fan publication covering Grand
          Theft Auto VI. It is not endorsed by, sponsored by, or affiliated
          with Rockstar Games, Take-Two Interactive, or their subsidiaries.
          Names, logos, artwork, and other trademarks belong to their respective
          owners.
        </p>
      </section>

      <section>
        <h2>Informational use only</h2>
        <p>
          Content is provided for news, commentary, reference, and
          entertainment. We work to distinguish confirmed information from
          analysis and rumor, but we do not guarantee that every page is
          complete, current, or error-free. GTA6Base content is not professional
          legal, financial, or investment advice.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for unlawful, fraudulent, or abusive activity.</li>
          <li>
            Interfere with the site, probe its security, or attempt unauthorized
            access to accounts or systems.
          </li>
          <li>
            Use automated requests in a way that disrupts service or ignores
            published access controls.
          </li>
          <li>
            Copy and republish substantial portions of original GTA6Base
            writing as your own.
          </li>
          <li>
            Misrepresent GTA6Base as an official Rockstar or Take-Two property.
          </li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          Original writing, site design, and organization created by GTA6Base
          are protected by applicable intellectual-property laws. Third-party
          game names, screenshots, promotional art, video frames, and related
          materials remain the property of their respective owners and are used
          for identification, reporting, criticism, commentary, or other
          legally permitted purposes.
        </p>
        <p>
          If you own rights to material shown here and believe its use is
          improper, contact us with the page URL, a description of the work, and
          evidence that you are authorized to act for the rights holder.
        </p>
      </section>

      <section>
        <h2>Links, advertising, and disclosures</h2>
        <p>
          The site may include third-party links and advertisements. We do not
          control third-party sites and are not responsible for their content,
          availability, privacy practices, or transactions. Advertising does
          not constitute our endorsement of an advertiser or product.
        </p>
        <p>
          Any compensated or affiliate relationship will be identified as
          described in our <Link href="/disclosure">Disclosure</Link>.
        </p>
      </section>

      <section>
        <h2>Availability and limitation of liability</h2>
        <p>
          The site is provided on an “as is” and “as available” basis. To the
          fullest extent permitted by law, GTA6Base disclaims implied warranties
          and is not liable for indirect, incidental, special, or consequential
          loss arising from use of, or inability to use, the site.
        </p>
        <p>
          Nothing in these terms excludes rights or liability that cannot
          legally be excluded.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          We may revise these terms as the site evolves. Continued use after a
          revision means the updated terms apply. Questions or rights-holder
          notices can be sent through our <Link href="/contact">Contact page</Link>.
        </p>
      </section>
    </PolicyPage>
  );
}
