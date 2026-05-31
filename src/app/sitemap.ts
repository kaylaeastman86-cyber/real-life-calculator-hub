import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";

const baseUrl = "https://reallifecalculatorhub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/calculators",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...calculators.map((calculator) => ({
      url: `${baseUrl}/calculators/${calculator.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
