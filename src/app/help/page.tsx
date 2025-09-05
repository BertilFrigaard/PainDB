import HelpSection from "@/components/sections/HelpSection";
import { pageMinRole } from "@/lib/utils/roleRestrictions";

export default async function HELP() {
    await pageMinRole({ role: "standard" });
    return (
        <main className="max-w-2xl mx-auto px-3 md:px-6 pb-10 md:py-16">
            <HelpSection />
        </main>
    );
}
