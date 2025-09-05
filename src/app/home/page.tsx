import { auth } from "@/auth";
import DataViewer from "@/components/data-views/DataView";
import { pageMinRole } from "@/lib/utils/roleRestrictions";
import Link from "next/link";

export default async function Home() {
    await pageMinRole({ role: "standard" });
    const session = await auth();
    return (
        <main className="px-5 md:px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary">
                Welcome home, {session!.user.name?.split(" ")[0] || "User"}!
            </h1>
            <section className="mx-auto bg-white rounded-xl shadow-md py-6 md:py-8 px-4 md:px-13 my-10 text-center md:text-start">
                <h2 className="text-2xl font-semibold text-secondary mb-4">Quick Access</h2>
                <div className="flex flex-col md:flex-row gap-5">
                    <Link
                        href={"/db-viewer"}
                        className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90"
                    >
                        Search Data
                    </Link>
                    <Link
                        href={"/feedback"}
                        className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90"
                    >
                        Provide Feedback
                    </Link>
                    <Link
                        href={"/help"}
                        className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90"
                    >
                        Get Help
                    </Link>
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
