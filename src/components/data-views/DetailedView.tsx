"use client";

import { PainPoint } from "@/types/PainPoint";
import { useEffect, useRef, useState } from "react";
import DataTable from "../tables/DataTable/DataTable";
import { IoClose } from "react-icons/io5";

export default function DetailedView({ exitFunc, dataPointID }: { exitFunc: () => void; dataPointID: string }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [painPoint, setPainPoint] = useState<null | PainPoint>(null);
    const [duplicates, setDuplicates] = useState<Map<string, PainPoint>>(new Map());
    const [loading, setLoading] = useState(true);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            exitFunc();
        }
    };

    useEffect(() => {
        const updateData = async () => {
            setLoading(true);
            const res = await fetch("/api/data/" + dataPointID);
            setPainPoint(await res.json());
            setLoading(false);
        };

        updateData();
    }, [dataPointID]);

    useEffect(() => {
        if (painPoint) {
            const updateDuplicates = async () => {
                painPoint.duplicates.forEach(async (id) => {
                    if (id) {
                        const res = await fetch("/api/data/" + id);
                        const json = await res.json();
                        setDuplicates((prev) => {
                            return new Map(prev).set(id, json);
                        });
                    }
                });
            };
            updateDuplicates();
        }
    }, [painPoint]);

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
        >
            <div
                ref={modalRef}
                className="w-full max-w-5xl rounded-3xl bg-background shadow-4xl p-0 relative border border-gray-100 flex flex-col md:flex-row"
            >
                <button
                    onClick={exitFunc}
                    className="absolute top-6 right-6 cursor-pointer text-gray-400 hover:text-primary transition-colors z-10 p-2 rounded-full bg-white shadow"
                    aria-label="Close"
                >
                    <IoClose size={28} />
                </button>
                {/* Left: Details */}
                <div className="flex-1 p-10 flex flex-col gap-8 bg-background rounded-3xl">
                    <h2 className="text-3xl font-bold text-secondary mb-2">Pain Point Details</h2>
                    {loading ? (
                        <div className="text-primary text-lg">Loading...</div>
                    ) : painPoint ? (
                        <>
                            <div className="grid grid-cols-[2fr_1fr] gap-x-10">
                                {/* Text Content */}
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <h3 className="text-primary font-semibold mb-1">Problem</h3>
                                        <p className="text-secondary">{painPoint.problem}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-primary font-semibold mb-1">Details</h3>
                                        <p className="text-secondary">{painPoint.description}</p>
                                    </div>
                                </div>

                                {/* Stat Cards */}
                                <div className="flex flex-col gap-4 justify-center items-center">
                                    {/* Created Card */}
                                    <div className="rounded-2xl overflow-hidden shadow-md w-full max-w-[180px]">
                                        <div className="bg-primary/90 px-5 py-6 flex items-center justify-center">
                                            <span className="text-3xl font-bold text-white">
                                                {new Date(painPoint.created).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="bg-secondary px-5 py-2 flex items-center justify-between">
                                            <span className="text-white font-semibold text-base">Created</span>
                                        </div>
                                    </div>
                                    {/* Validation Card */}
                                    <div className="rounded-2xl overflow-hidden shadow-md w-full max-w-[180px]">
                                        <div className="bg-primary/90 px-5 py-6 flex items-center justify-center">
                                            <span className="text-3xl font-bold text-white">
                                                {painPoint.validation ? `${painPoint.validation}` : "--"}
                                            </span>
                                        </div>
                                        <div className="bg-secondary px-5 py-2 flex items-center justify-between">
                                            <span className="text-white font-semibold text-base">Validation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <DataTable
                                    data={Array.from(duplicates.values()).map((painPoint) => {
                                        return {
                                            "Similar Problems": painPoint.problem,
                                            Validation: painPoint.validation,
                                        };
                                    })}
                                />
                                {/* <PainPointTable painPoints={painPoint ? [painPoint] : []} setFavorite={(row) => {}} /> */}
                            </div>
                        </>
                    ) : (
                        <div className="text-red-500">No data found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
