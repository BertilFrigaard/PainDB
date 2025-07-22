import DuplicateReview from "@/components/DuplicateReview";
import { restrictPage } from "@/lib/utils/pageRestriction";

export default async function ReviewDuplicates() {
    await restrictPage("admin");
    return (
        <main className="px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary text-center mb-10">Review Duplicates</h1>
            <DuplicateReview />
        </main>
    );
}
