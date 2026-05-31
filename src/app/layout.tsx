import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Real Life Calculator Hub",
    template: "%s | Real Life Calculator Hub"
  },
  description:
    "Simple everyday calculators for paychecks, rent, gas costs, budgets, debt, and other real-life money decisions.",
  metadataBase: new URL("https://reallifecalculatorhub.com")
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-xl font-bold tracking-normal text-ink">
                Real Life Calculator Hub
              </Link>
              <nav aria-label="Main navigation">
                <ul className="flex flex-wrap gap-2 text-sm font-semibold text-slate-700">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="inline-flex min-h-10 items-center rounded-md px-3 py-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-calm"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-ink">Real Life Calculator Hub</p>
                <p className="mt-2 max-w-xl">
                  Everyday calculator tools for quick estimates. Results are for
                  planning only and are not financial, legal, tax, or professional advice.
                </p>
              </div>
              <nav aria-label="Footer navigation" className="sm:text-right">
                <Link className="mr-4 hover:text-calm" href="/privacy-policy">
                  Privacy
                </Link>
                <Link className="mr-4 hover:text-calm" href="/terms">
                  Terms
                </Link>
                <Link className="hover:text-calm" href="/disclaimer">
                  Disclaimer
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
