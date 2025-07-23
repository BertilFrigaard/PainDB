import DuplicateReview from "@/components/sections/DuplicateReview";

export default async function ReviewDuplicates() {
    return (
        <main className="px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary text-center mb-10">Review Duplicates</h1>
            <DuplicateReview />
        </main>
    );
}
