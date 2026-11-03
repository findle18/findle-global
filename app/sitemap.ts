import type { MetadataRoute } from "next";

const siteUrl = "https://www.findle.global";

const publicRoutes = [
  "/",
  "/about",
  "/blogs",
  "/blog-1",
  "/blog-2",
  "/blog-3",
  "/contact",
  "/directory",
  "/faq",
  "/FindleFinance",
  "/guide",
  "/marketInsights",
  "/partner",
  "/privacy",
  "/developers/arista-homes",
  "/developers/branthaven",
  "/developers/caivan-communities",
  "/developers/castleridge-homes",
  "/developers/countrywide-homes",
  "/developers/fernbrook-homes",
  "/developers/fusion-homes",
  "/developers/great-gulf",
  "/developers/hallett-homes",
  "/developers/losani-homes",
  "/developers/mattamy-homes",
  "/developers/minto-homes",
  "/developers/primont-homes",
  "/developers/reids-heritage",
  "/developers/trinity-point",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
