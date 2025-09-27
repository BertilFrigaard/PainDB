import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = "https://paindb.com"

    const staticRoutes = ["/", "/examples", "/faq"]

    return [...staticRoutes].map((route) => ({
        url: `${base}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1.0 : 0.7,
    }));
}