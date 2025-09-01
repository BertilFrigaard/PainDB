import FeedbackViewSection from "@/components/sections/FeedbackViewSection";
import { pageMinRole } from "@/lib/utils/roleRestrictions";

export default async function ViewFeedback() {
    await pageMinRole({ role: "admin" });
    return (
        <main className="px-5 md:px-30 py-10">
            <FeedbackViewSection />
        </main>
    );
}
