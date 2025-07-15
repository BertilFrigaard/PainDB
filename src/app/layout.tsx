import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
    title: "PainDB",
    description: "PainDB | Skip early validation - Solve actual problems",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <Header />
                {children}
            </body>
        </html>
    );
}
