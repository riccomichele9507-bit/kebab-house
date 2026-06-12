import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kebab-house.vercel.app";
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/ordina`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
