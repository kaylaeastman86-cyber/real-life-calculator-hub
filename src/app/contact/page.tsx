import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Real Life Calculator Hub with feedback or calculator ideas."
};

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact"
      description="Have feedback, a correction, or an idea for a future calculator?"
    >
      <p>
        Send a note to{" "}
        <a className="font-bold text-calm hover:text-teal-800" href="mailto:hello@reallifecalculatorhub.com">
          hello@reallifecalculatorhub.com
        </a>
        .
      </p>
      <p>
        Please do not send sensitive personal information. Calculator results are
        estimates, and this site cannot provide personal financial, legal, tax, or
        professional advice.
      </p>
    </InfoPage>
  );
}
