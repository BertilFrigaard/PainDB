import ManageValidationScore from "@/components/sections/ManageValidationScore";
import { pageMinRole } from "@/lib/utils/roleRestrictions";

export default async function ValidationScores() {
    await pageMinRole({ role: "admin" });
    return (
        <main className="px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary text-center mb-10">Manage Validation Scores</h1>
            <ManageValidationScore />
        </main>
    );
}
