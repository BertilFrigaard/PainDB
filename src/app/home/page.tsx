import DataViewer from "@/components/data-views/DataView";
import { restrictPage } from "@/lib/utils/pageRestriction";

export default async function Home() {
    await restrictPage();
    return (
        <main className="px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary">Welcome home, Bertil!</h1>
            <section className="mx-auto bg-white rounded-xl shadow-md py-8 px-13 my-10">
                <h2 className="text-2xl font-semibold text-secondary mb-4">Quick Access</h2>
                <div className="flex gap-5">
                    <button className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90">
                        Search Data
                    </button>
                    <button className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90">
                        Create Pipeline
                    </button>
                    <button className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90">
                        Provide Feedback
                    </button>
                </div>
            </section>
            <DataViewer
                title="Favorite Pain Points"
                filter_dropdown={false}
                default_filter="favorites"
                default_order="most_validation"
            />
        </main>
    );
}
