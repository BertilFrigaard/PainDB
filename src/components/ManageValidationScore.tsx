"use client";

import { useState } from "react";

export default function ManageValidationScore() {
    const [loading, setLoading] = useState(false);

    const updateValidationScores = async () => {
        setLoading(true);
        fetch("/api/data/validation-scores/refresh", { method: "POST" });
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
                            onClick={updateValidationScores}
                            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 cursor-pointer transition"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
