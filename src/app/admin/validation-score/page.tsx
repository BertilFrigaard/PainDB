import ManageValidationScore from "@/components/sections/ManageValidationScore";

export default async function ReviewDuplicates() {
    return (
        <main className="px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary text-center mb-10">Manage Validation Scores</h1>
            <ManageValidationScore />
        </main>
    );
}
