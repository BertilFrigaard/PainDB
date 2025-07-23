"use client";
import { PainPoint } from "@/types/PainPoint";
import { useEffect, useState } from "react";
import PainPointTable from "../tables/PainPointTable/PainPointTable";
import FileSaver from "file-saver";
import { UseAlerts } from "@/contexts/AlertContext";
import DropDownSecondaryButton from "../buttons/drop-downs/styles/DropDownSecondaryButton";
import DropDownPrimaryButton from "../buttons/drop-downs/styles/DropDownPrimaryButton";
import { FaSearch } from "react-icons/fa";

const orderItemNames = {
    most_recent: "Most Recent",
    most_validation: "Highest Validation",
    least_recent: "Least Recent",
    least_validation: "Lowest Validation",
};

const filterItemNames = {
    all: "Show All",
    favorites: "Only Favorites",
};

export default function DataViewer({
    title,
    default_order = "most_recent",
    default_filter = "all",
    order_dropdown = true,
    filter_dropdown = true,
    search_field = false,
}: {
    title: string;
    default_order?: keyof typeof orderItemNames;
    default_filter?: keyof typeof filterItemNames;
    order_dropdown?: boolean;
    filter_dropdown?: boolean;
    search_field?: boolean;
}) {
    const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
    const [order, setOrder] = useState(default_order);
    const [filter, setFilter] = useState(default_filter);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const { addAlert } = UseAlerts();

    useEffect(() => {
        const updateData = async () => {
            const res = await fetch(
                "/api/data?page-size=10&page-index=0&order=" + order + "&filter=" + filter + "&search=" + query
            );
            if (res.status === 200) {
                const rows = await res.json();
                setPainPoints(rows);
            } else {
                addAlert({ message: "Something went wrong", bg: "bg-error" }, 3000);
            }
            setLoading(false);
        };
        updateData();
    }, [order, filter, query]);

    const getOrderDropDownItems = () => {
        const out: { text: string; link?: string | undefined; func?: (() => void) | undefined }[] = [];

        for (const k in orderItemNames) {
            const v = orderItemNames[k as keyof typeof orderItemNames];
            if (order === k) {
                out.push({ text: v });
            } else {
                out.push({
                    text: v,
                    func: () => {
                        setOrder(k as keyof typeof orderItemNames);
                    },
                });
            }
        }

        return out;
    };

    const getFilterDropDownItems = () => {
        const out: { text: string; link?: string | undefined; func?: (() => void) | undefined }[] = [];

        for (const k in filterItemNames) {
            const v = filterItemNames[k as keyof typeof filterItemNames];
            if (filter === k) {
                out.push({ text: v });
            } else {
                out.push({
                    text: v,
                    func: () => {
                        setFilter(k as keyof typeof filterItemNames);
                    },
                });
            }
        }

        return out;
    };

    const escapeCSV = (val: unknown): string => {
        if (val == null) return "";
        const str = String(val);
        return `"${str.replace(/"/g, '""')}"`;
    };

    const exportData = async (amount: number) => {
        try {
            const res = await fetch(`/api/data?page-size=${amount}&page-index=0&order=${order}` + "&filter=" + filter);
            if (!res.ok) {
                console.error("Failed to fetch data:", res.status, await res.text());
                return;
            }

            const rows: PainPoint[] = await res.json();
            if (rows.length === 0) {
                console.log("No data to export");
                return;
            }

            const headers = Object.keys(rows[0]) as (keyof PainPoint)[];
            const csvRows = [
                headers.join(","), // header row
                ...rows.map((row) => headers.map((h) => escapeCSV(row[h])).join(",")),
            ];

            const csvData = new Blob(["\uFEFF" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
            FileSaver.saveAs(csvData, "paindb_data.csv");
        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    const setFavorite = async (row: PainPoint) => {
        const wasFavorite = row.favorite;

        const url = wasFavorite
            ? "/api/data/favorites/remove?data-point-id=" + row.id
            : "/api/data/favorites/add?data-point-id=" + row.id;

        setPainPoints((prev) => {
            return prev.map((v) => (v.id === row.id ? { ...v, favorite: !wasFavorite } : v));
        });

        await fetch(url, { method: "POST" });
    };

    return (
        <section className="mx-auto bg-white rounded-xl shadow-md py-8 px-13">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

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
            <div className="my-8 space-y-4">
                {search_field && (
                    <form className="relative flex items-center w-fit min-w-xl">
                        <FaSearch className="absolute left-3 text-secondary pointer-events-none" />
                        <input
                            id="search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none transition"
                        />
                    </form>
                )}
                <div className="gap-2 flex">
                    <DropDownPrimaryButton
                        text="Export CSV"
                        items={[
                            {
                                text: "All",
                                func: () => {
                                    exportData(100000);
                                },
                            },
                            {
                                text: "Top 100",
                                func: () => {
                                    exportData(100);
                                },
                            },
                            {
                                text: "Top 250",
                                func: () => {
                                    exportData(250);
                                },
                            },
                            {
                                text: "Top 500",
                                func: () => {
                                    exportData(500);
                                },
                            },
                            {
                                text: "Top 1000",
                                func: () => {
                                    exportData(1000);
                                },
                            },
                        ]}
                    />
                    {order_dropdown && (
                        <DropDownSecondaryButton text={orderItemNames[order]} items={getOrderDropDownItems()} />
                    )}
                    {filter_dropdown && (
                        <DropDownSecondaryButton text={filterItemNames[filter]} items={getFilterDropDownItems()} />
                    )}
                </div>
            </div>
            {loading ? (
                <>
                    <PainPointTable setFavorite={setFavorite} painPoints={[]} />
                    <p className="text-center p-10 font-bold text-lg text-gray-500">Loading</p>
                </>
            ) : (
                <>
                    <PainPointTable setFavorite={setFavorite} painPoints={painPoints} />
                    {painPoints.length === 0 && (
                        <p className="text-center p-10 font-bold text-lg text-gray-500">No Data</p>
                    )}
                </>
            )}
        </section>
    );
}
