import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/korpa"],
    },
    sitemap: "https://kovo.rs/sitemap.xml",
  };
}
