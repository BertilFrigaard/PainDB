import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { AlertProvider } from "@/contexts/AlertContext";

const baseUrl = new URL("https://paindb.com")

export const metadata: Metadata = {
    metadataBase: baseUrl,
    title: {
        default: "PainDB",
        template: "%s - PainDB"
    },
    description: "Skip early validation - Solve actual problems",
    keywords: ["pain points", "pain point database", "validate ideas", "validate startup ideas", "market signals"],
    authors: [{name: "Bertil Frigaard"}],
    creator: "Bertil Frigaard",
    alternates: {
        canonical: baseUrl.toString()
    },
    openGraph: {
    type: "website",
    url: baseUrl.toString(),
    siteName: "PainDB",
    title: "PainDB",
    description: "PainDB | Skip early validation - Solve actual problems",
    images: ["/seo/landing.png"], // 1200x630
    locale: "en_US",
    },
    manifest: "/site.webmanifest",
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <AlertProvider>
                    <Header />
                    {children}
                    <Footer />
                </AlertProvider>
            </body>
        </html>
    );
}
