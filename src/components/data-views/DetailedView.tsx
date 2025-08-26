"use client";

import { PainPoint } from "@/types/painpoint/PainPoint";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { UseAlerts } from "@/contexts/AlertContext";
import { BigPainPoint } from "@/types/painpoint/BigPainPoint";
import { CalendarDays, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { FaRegStar, FaStar } from "react-icons/fa";
import CustomTable from "../tables/CustomTable/CustomTable";

// Lightweight skeletons for loading states (UI-only)
function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded-xl bg-gray-200/70 dark:bg-gray-800/40 ${className}`} />;
}

export default function DetailedView({ exitFunc, dataPointID }: { exitFunc: () => void; dataPointID: string }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [painPoint, setPainPoint] = useState<null | BigPainPoint>(null);
    const [similar, setSimilar] = useState<Map<string, PainPoint>>(new Map());
    const [loading, setLoading] = useState(true);

    const { addAlert } = UseAlerts();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            exitFunc();
        }
    };

    useEffect(() => {
        const updateData = async () => {
            setLoading(true);
            const res = await fetch("/api/data/" + dataPointID);
            if (res.status === 200) {
                setPainPoint(await res.json());
            } else {
                addAlert({ message: "Failed to get data (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            }
            setLoading(false);
        };

        updateData();
    }, [dataPointID]);

    useEffect(() => {
        if (painPoint) {
            const updateSimilar = async () => {
                painPoint.similar.slice(0, 3).forEach(async (id) => {
                    if (id) {
                        const res = await fetch("/api/data/" + id);
                        if (res.status !== 200) {
                            addAlert(
                                { message: "Failed to get data (error code: " + res.status + ")", bg: "bg-error" },
                                3000
                            );
                            return;
                        }
                        const json = await res.json();
                        setSimilar((prev) => {
                            return new Map(prev).set(id, json);
                        });
                    }
                });
            };
            updateSimilar();
        }
    }, [painPoint]);

    const setFavorite = async () => {
        if (!painPoint) {
            addAlert({ message: "PainPoint not loaded. Please wait before trying again.", bg: "bg-warn" }, 3000);
            return;
        }

        const url = painPoint.favorite
            ? "/api/data/favorites/remove?data-point-id=" + painPoint.id
            : "/api/data/favorites/add?data-point-id=" + painPoint.id;

        setPainPoint((prev) => {
            if (prev) {
                return { ...prev, favorite: !prev.favorite };
            } else {
                return null;
            }
        });

        const res = await fetch(url, { method: "POST" });

        if (res.status !== 204) {
            addAlert({ message: "Failed to update favorite (error code: " + res.status + ")", bg: "bg-error" }, 3000);
        }
    };

    const PrettyDate = ({ date }: { date: string }) => (
        <span>
            {new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
            })}
        </span>
    );

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gradient-to-b from-white to-white/90 dark:from-gray-900 dark:to-gray-900/90"
                role="dialog"
                aria-modal="true"
            >
                {/* Content */}
                <div className="grid md:grid-cols-5 gap-0">
                    {/* Left: Details */}
                    <div className="md:col-span-3 p-8 md:p-10 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-secondary">Pain Point Details</h2>
                            <p className="text-secondary/70 text-sm">
                                Deep dive into a single signal plus closely related items.
                            </p>
                        </div>

                        {loading ? (
                            <div className="space-y-6">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-28 w-full" />
                            </div>
                        ) : painPoint ? (
                            <>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-primary font-semibold mb-2">Problem</h3>
                                        <p className="text-secondary leading-relaxed text-[15px] md:text-base">
                                            {painPoint.problem}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-primary font-semibold mb-2">Details</h3>
                                        <p className="text-secondary/90 leading-relaxed text-[15px] md:text-base">
                                            {painPoint.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Similar problems */}
                                <div className="pt-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-secondary">Similar problems</h3>
                                    </div>
                                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                        <CustomTable
                                            columns={[
                                                { index: "problem", name: "Problem" },
                                                { index: "validation", name: "Validation", centered: true },
                                            ]}
                                            data={Array.from(similar.values())
                                                .slice(0, 3)
                                                .map((pp) => ({
                                                    problem: pp.problem,
                                                    validation: String(pp.validation),
                                                }))}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-error">No data found.</div>
                        )}
                    </div>

                    {/* Right: Stat cards column */}
                    <div className="md:col-span-2 bg-gradient-to-b from-secondary/5 to-transparent p-8 md:p-10 border-l border-gray-100 space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                            <div className="flex justify-end gap-2">
                                {painPoint ? (
                                    <button
                                        onClick={setFavorite}
                                        className="cursor-pointer rounded-xl bg-white/90 backdrop-blur shadow-md border border-gray-200"
                                        aria-label="Close"
                                    >
                                        {painPoint.favorite ? (
                                            <div className="text-favorite hover:text-gray-500 px-3 py-2 transition duration-200">
                                                <FaStar className="font-bold text-lg " />
                                            </div>
                                        ) : (
                                            <div className="hover:text-favorite text-gray-500 px-3 py-2 transition duration-200">
                                                <FaRegStar className="font-bold text-lg" />
                                            </div>
                                        )}
                                    </button>
                                ) : (
                                    <Skeleton className="h-8 w-8" />
                                )}

                                <button
                                    onClick={exitFunc}
                                    className="cursor-pointer rounded-xl bg-white/90 backdrop-blur px-3 py-2 text-gray-500 hover:text-secondary shadow-md border border-gray-200"
                                    aria-label="Close"
                                >
                                    <IoClose size={22} />
                                </button>
                            </div>
                            {/* Created Card */}
                            <div className="group rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl p-2.5 bg-primary/10 text-primary">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>
                                    <div className="text-sm text-secondary/60">Created</div>
                                </div>
                                <div className="mt-3 text-2xl font-bold text-secondary">
                                    {loading || !painPoint ? (
                                        <Skeleton className="h-8 w-32" />
                                    ) : (
                                        <PrettyDate date={String(painPoint.created)} />
                                    )}
                                </div>
                            </div>

                            {/* Validation Card */}
                            <div className="group rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl p-2.5 bg-primary/10 text-primary">
                                        <Gauge className="h-5 w-5" />
                                    </div>
                                    <div className="text-sm text-secondary/60">Validation</div>
                                </div>
                                <div className="mt-3 text-2xl font-bold text-secondary">
                                    {loading || !painPoint ? (
                                        <Skeleton className="h-8 w-16" />
                                    ) : (
                                        <span>{painPoint.validation ? `${painPoint.validation}` : "--"}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Helpful note */}
                        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-primary/5 to-secondary/5 p-5 text-sm text-secondary leading-relaxed">
                            Compare this signal with similar problems to assess opportunity size and overlap.
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
