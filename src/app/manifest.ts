import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PainDB",
    short_name: "PainDB",
    description: "PainDB is a pain point database that helps founders validate startup ideas quickly by focusing on real customer problems.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff"
  };
}