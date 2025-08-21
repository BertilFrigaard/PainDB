import { auth } from "@/auth";
import FeedbackSection from "@/components/sections/FeedbackSection";
import { pageMinRole } from "@/lib/utils/roleRestrictions";

export default async function Profile() {
    const session = await auth();
    await pageMinRole({ role: "none", session: session });
    return (
        <main className="max-w-2xl mx-auto px-6 py-16">
            <FeedbackSection />
        </main>
    );
}
