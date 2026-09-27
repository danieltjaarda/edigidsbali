import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { TOURS } from "@/lib/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const fixed: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/images/hero-poster.jpg`],
    },
    {
      url: `${SITE_URL}/tours`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/fotoverantwoording`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const tours: MetadataRoute.Sitemap = TOURS.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: tour.popular ? 0.8 : 0.7,
    images: [`${SITE_URL}${tour.image}`],
  }));

  return [...fixed, ...tours];
}
