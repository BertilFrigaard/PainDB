import FaqSection from "@/components/sections/FaqSection";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const url = new URL("https://paindb.com/faq");

    return {
        title: "FAQ",
        description: "Find answers to common questions about PainDB, the pain point database for startup idea validation. Learn how it works, what data we include, and how you can use customer pain points to discover real market opportunities.",
        openGraph: {
        type: "website",
        url: url.toString(),
        siteName: "PainDB",
        title: "FAQ - PainDB",
        description: "Find answers to common questions about PainDB, the pain point database for startup idea validation. Learn how it works, what data we include, and how you can use customer pain points to discover real market opportunities.",
        images: ["/seo/landing.png"], // 1200x630
        locale: "en_US",
    },
    }
}

export default async function FAQ() {
    return (
        <main className="max-w-2xl mx-auto px-3 md:px-6 pb-10 md:py-16">
            <FaqSection />
        </main>
    );
}
