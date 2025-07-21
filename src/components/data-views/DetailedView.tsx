"use client";

import { PainPoint } from "@/types/PainPoint";
import { useEffect, useRef, useState } from "react";

export default function DetailedView({ exitFunc, dataPointID }: { exitFunc: () => void; dataPointID: string }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [painPoint, setPainPoint] = useState<null | PainPoint>(null);
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

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
        >
            <div
                ref={modalRef}
                className="w-full max-w-5xl rounded-3xl bg-background shadow-4xl p-0 relative border border-gray-100 flex flex-col md:flex-row"
            >
                {/* Left: Details */}
                <div className="flex-1 p-10 flex flex-col gap-8 bg-white rounded-l-3xl">
                    <h2 className="text-3xl font-bold text-secondary mb-2">Pain Point Details</h2>
                    {loading ? (
                        <div className="text-primary text-lg">Loading...</div>
                    ) : painPoint ? (
                        <>
                            <div>
                                <h3 className="text-primary font-semibold mb-1">Problem</h3>
                                <p className="text-secondary">{painPoint.problem}</p>
                            </div>
                            <div>
                                <h3 className="text-primary font-semibold mb-1">Details</h3>
                                <p className="text-secondary">{painPoint.description}</p>
                            </div>
                            {painPoint.duplicates && painPoint.duplicates.length > 0 && (
                                <div>
                                    <h3 className="text-primary font-semibold mb-1">Duplicate Reports</h3>
                                    <ul className="list-disc ml-6 text-gray-600">
                                        {painPoint.duplicates.map((dup, idx) => (
                                            <li key={idx}>{dup}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-red-500">No data found.</div>
                    )}
                    <button
                        onClick={exitFunc}
                        className="mt-4 w-full py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 transition"
                    >
                        Close
                    </button>
                </div>
                {/* Right: Stats */}
                <div className="flex flex-col gap-6 justify-center items-center bg-secondary rounded-r-3xl p-10 min-w-[220px]">
                    <div className="bg-primary/90 p-6 rounded-xl w-full text-center">
                        <span className="text-white font-extrabold text-lg">Created</span>
                        <p className="text-white text-xl font-bold mt-2">
                            {painPoint?.created ? new Date(painPoint.created).toLocaleString() : "--"}
                        </p>
                    </div>
                    <div className="bg-primary/90 p-6 rounded-xl w-full text-center">
                        <span className="text-white font-extrabold text-lg">Validation Score</span>
                        <p className="text-white text-xl font-bold mt-2">{painPoint?.validation ?? "--"}</p>
                    </div>
                    <div className="bg-primary/90 p-6 rounded-xl w-full text-center">
                        <span className="text-white font-extrabold text-lg">Actuality Score</span>
                        <p className="text-white text-xl font-bold mt-2">{painPoint?.validation ?? "--"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
