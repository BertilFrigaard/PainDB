"use client";
import { PainPoint } from "@/types/PainPoint";
import { useState } from "react";
import PainPointTable from "../tables/PainPointTable/PainPointTable";

export default function SearchableDataViewer() {
    const [query, setQuery] = useState("");
    const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const performSearch = async () => {
        setLoading(true);
        const res = await fetch("/api/data/search?search-query=" + query + "&page-size=10&page-index=0");
        if (res.status === 200) {
            const rows = await res.json();
            setPainPoints(rows);
        }
        setLoading(false);
    };

    return (
        <section className="mx-auto bg-white rounded-xl shadow-md py-8 px-13">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Search Pain Points</h2>

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
            <form action={performSearch} className="flex space-x-5 my-10">
                <button
                    type="submit"
                    className="rounded-xl bg-primary px-7 text-white animating-button hover:bg-primary/90"
                >
                    Search
                </button>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 px-7 py-3 focus:border-primary focus:ring-primary"
                />
            </form>
            {loading ? (
                <>
                    <PainPointTable painPoints={[]} />
                    <p className="text-center p-10 font-bold text-lg text-gray-500 animate-bounce duration-100">
                        Loading
                    </p>
                </>
            ) : (
                <>
                    <PainPointTable painPoints={painPoints} />
                    {painPoints.length === 0 && (
                        <p className="text-center p-10 font-bold text-lg text-gray-500">No Data</p>
                    )}
                </>
            )}
        </section>
    );
}
