"use client";

import { useState } from "react";

export default function PipelineAdminInterface() {
    const [loading, setLoading] = useState(false);

    function getRollbackUnixTimestamp(days: number) {
        const now = new Date();
        const rollbackDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        return Math.floor(rollbackDate.getTime() / 1000);
    }

    const addPipeline = async () => {
        setLoading(true);
        const res = await fetch("/api/pipelines/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sub_reddit: "r/sidehustle", from: getRollbackUnixTimestamp(1) }),
        });

        console.log("status: " + res.status);
        setLoading(false);
    };
    return (
        <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={addPipeline}
                            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 cursor-pointer transition"
                        >
                            Add Pipeline
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
