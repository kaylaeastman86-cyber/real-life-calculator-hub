import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Real Life Calculator Hub."
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      description="This page explains the basic privacy approach for Real Life Calculator Hub."
    >
      <p>
        Real Life Calculator Hub is an informational calculator website. The current
        MVP does not require accounts and does not ask users to submit calculator
        results to a server.
      </p>
      <h2 className="text-2xl font-bold tracking-normal text-ink">Calculator inputs</h2>
      <p>
        Calculator inputs are used in your browser to show an estimate. You should
        avoid entering sensitive personal information into any public website unless
        you understand how it is handled.
      </p>
      <h2 className="text-2xl font-bold tracking-normal text-ink">Future analytics or ads</h2>
      <p>
        The site may later use privacy-conscious analytics or advertising tools. If
        that happens, this policy should be updated before those tools are added.
      </p>
    </InfoPage>
  );
}
