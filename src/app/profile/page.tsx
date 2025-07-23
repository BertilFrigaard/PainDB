import { auth } from "@/auth";
import ProfileSection from "@/components/sections/ProfileSection";
import { pageMinRole } from "@/lib/utils/roleRestrictions";

export default async function Profile() {
    const session = await auth();
    pageMinRole({ role: "none", session: session });
    return (
        <section className="max-w-2xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold text-secondary mb-8">Your Profile</h1>

            <ProfileSection session={session!} />
        </section>
    );
}
