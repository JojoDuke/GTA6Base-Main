import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

const contactEmail = "contact@gta6base.io";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GTA6Base about corrections, privacy, advertising, or rights-holder concerns.",
};

export default function ContactPage() {
  return (
    <PolicyPage
      title="Contact GTA6Base"
      description="Use the address below for editorial corrections, privacy requests, advertising inquiries, or rights-holder notices."
    >
      <section>
        <h2>Email</h2>
        <p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
        <p>
          Include the relevant GTA6Base page URL and a clear description of
          your request. Please do not send passwords, payment details, or other
          sensitive information.
        </p>
      </section>

      <section>
        <h2>Corrections and sourcing</h2>
        <p>
          For a factual correction, use the subject line “Correction” and
          include a reliable source when possible. We review corrections
          against our editorial standards and update material when warranted.
        </p>
      </section>

      <section>
        <h2>Copyright and trademark concerns</h2>
        <p>
          Rights holders should identify the protected work, the exact URL
          where it appears, the requested action, and evidence that the sender
          is authorized to act. We review good-faith notices promptly.
        </p>
      </section>

      <section>
        <h2>Advertising</h2>
        <p>
          Use the subject line “Advertising” for placement or partnership
          questions. Editorial coverage, factual labels, and corrections are
          not for sale.
        </p>
      </section>
    </PolicyPage>
  );
}
