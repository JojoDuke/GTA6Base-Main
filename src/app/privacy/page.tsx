import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GTA6Base handles analytics, advertising data, cookies, and user choices.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="This policy explains what information GTA6Base and its service providers collect, why it is used, and the choices available to visitors."
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          When you visit GTA6Base, technical information may be collected
          automatically. This can include your IP address, browser and device
          type, operating system, referring page, pages viewed, approximate
          location, and the date and time of your visit.
        </p>
        <p>
          If you contact us, we receive the information you choose to include,
          such as your email address and message. Please do not send sensitive
          personal information.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>
          We use Google Analytics 4 to understand aggregate site traffic and
          how visitors use the site. Google Analytics may use cookies or
          similar technologies to collect usage and device information. We use
          these reports to improve navigation, content, and site performance.
        </p>
        <p>
          Learn more in{" "}
          <a href="https://policies.google.com/privacy">
            Google&apos;s Privacy Policy
          </a>{" "}
          and through the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">
            Google Analytics opt-out browser add-on
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Advertising and cookies</h2>
        <p>
          We use Google AdSense to display advertising. Third-party vendors,
          including Google, use cookies to serve ads based on a visitor&apos;s
          prior visits to GTA6Base or other websites. Google&apos;s use of
          advertising cookies enables it and its partners to serve personalized
          ads where permitted.
        </p>
        <p>
          Third parties may place and read cookies in your browser, or use web
          beacons, IP addresses, and similar identifiers as a result of ad
          serving. Read{" "}
          <a href="https://policies.google.com/technologies/partner-sites">
            how Google uses information from sites that use its services
          </a>
          .
        </p>
        <p>
          You can manage personalized advertising through{" "}
          <a href="https://adssettings.google.com/">Google Ads Settings</a> or
          opt out of some third-party vendors through{" "}
          <a href="https://www.aboutads.info/choices">AboutAds</a>. You can also
          block or delete cookies in your browser, although parts of the site
          may work differently as a result.
        </p>
      </section>

      <section>
        <h2>Consent in applicable regions</h2>
        <p>
          Where required by law, visitors may be shown a consent message before
          personalized advertising cookies are used. Choices made through that
          message can be changed or withdrawn through the privacy controls it
          provides.
        </p>
      </section>

      <section>
        <h2>How information is used and shared</h2>
        <ul>
          <li>Operate, secure, and troubleshoot GTA6Base.</li>
          <li>Measure readership and improve the visitor experience.</li>
          <li>Display, measure, and prevent abuse of advertising.</li>
          <li>Respond to messages and enforce our terms.</li>
          <li>Comply with legal obligations and protect legitimate rights.</li>
        </ul>
        <p>
          Information may be processed by service providers such as Google and
          our hosting provider for these purposes. We do not sell personal
          information directly. Advertising providers may process data as
          described in their own policies.
        </p>
      </section>

      <section>
        <h2>Retention, security, and children</h2>
        <p>
          Information is retained only as long as reasonably needed for the
          purposes above, subject to provider settings and legal obligations.
          We use reasonable safeguards, but no internet service can guarantee
          absolute security.
        </p>
        <p>
          GTA6Base is intended for a general audience and is not directed to
          children under 13. We do not knowingly collect personal information
          from children.
        </p>
      </section>

      <section>
        <h2>Your choices and contact</h2>
        <p>
          Depending on where you live, you may have rights to request access,
          correction, deletion, or restriction of personal information. To ask
          a privacy question or make a request, visit our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy when our services or legal obligations
          change. The date at the top of this page shows the latest revision.
        </p>
      </section>
    </PolicyPage>
  );
}
