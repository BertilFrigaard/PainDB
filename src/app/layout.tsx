import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { AlertProvider } from "@/contexts/AlertContext";

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
                <AlertProvider>
                    <Header />
                    {children}
                    <Footer />
                </AlertProvider>
            </body>
        </html>
    );
}
