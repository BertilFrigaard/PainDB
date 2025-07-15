"use client";
import PainPointTable from "@/components/tables/PainPointTable/PainPointTable";
import { PainPoint } from "@/types/PainPoint";
import { useEffect, useState } from "react";

export default function Pricing() {
    const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const updateData = async () => {
            const res = await fetch("/api/data");
            if (res.status === 200) {
                const rows = await res.json();
                setPainPoints(rows);
            }
            setLoading(false);
        };
        updateData();
    }, []);

    return (
        <main className="mx-30 py-10 space-y-12">
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

            <section className="mx-auto bg-white rounded-xl shadow-md py-8 px-13">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Search Pain Points</h2>
                </div>
                <form action="" className="flex space-x-5 my-10">
                    <button
                        type="submit"
                        className="rounded-xl bg-primary px-7 text-white animating-button hover:bg-primary/90"
                    >
                        Search
                    </button>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 w-full rounded-xl border border-gray-300 px-7 py-3 focus:border-primary focus:ring-primary"
                    />
                </form>
                {loading ? (
                    <>
                        <PainPointTable painPoints={[]} />
                        <p className="text-center p-10 font-bold text-lg text-gray-500">Loading</p>
                    </>
                ) : (
                    <>
                        <PainPointTable painPoints={[]} />
                        <p className="text-center p-10 font-bold text-lg text-gray-500">No Data</p>
                    </>
                )}
            </section>

            <section className="mx-auto bg-white rounded-xl shadow-md py-8 px-13">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">View Pain Points</h2>

                    <div className="flex items-center gap-3  text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                        <span className="text-sm">Click a row to see more details</span>
                    </div>
                </div>

                {loading ? (
                    <>
                        <PainPointTable painPoints={[]} />
                        <p className="text-center p-10 font-bold text-lg text-gray-500">Loading</p>
                    </>
                ) : (
                    <PainPointTable painPoints={painPoints} />
                )}
            </section>
        </main>
    );
}
