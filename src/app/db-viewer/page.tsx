import DataViewer from "@/components/data-views/DataView";
import { pageMinRole } from "@/lib/utils/roleRestrictions";
export default async function DBViewer() {
    await pageMinRole({ role: "starter" });
    return (
        <main className="px-5 md:px-30 py-10 space-y-12">
            <section className="text-center">
                <h1 className="text-5xl font-bold text-secondary mb-4">Pain Point Database</h1>
                <p className="text-lg text-gray-600">
                    Explore real-world problems collected from potential customers. Need help <br />
                    using the database?{" "}
                    <a href="/help" className="text-primary underline hover:text-primary/80 transition">
                        Visit our help page.
                    </a>
                </p>
            </section>
            <DataViewer title="Pain Points" search_field={true} />
        </main>
    );
}
