import HelpSection from "@/components/sections/HelpSection";
import { pageMinRole } from "@/lib/utils/roleRestrictions";

export default async function HELP() {
    await pageMinRole({ role: "starter" });
    return (
        <main className="max-w-2xl mx-auto px-6 py-16">
            <HelpSection />
        </main>
    );
}
