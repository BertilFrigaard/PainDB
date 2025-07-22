"use client";

import { DuplicateLink } from "@/types/DuplicateLink";
import { useEffect, useState } from "react";

export default function DuplicateReview() {
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState<DuplicateLink[]>([]);

    const verifyLink = async () => {
        setLoading(true);
        await fetch("/api/data/duplicates/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(links[0]),
        });
        links.splice(0, 1);
        setLoading(false);
    };

    const dismissLink = async () => {
        setLoading(true);
        await fetch("/api/data/duplicates/dismiss", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(links[0]),
        });
        links.splice(0, 1);
        setLoading(false);
    };

    useEffect(() => {
        const updateLinks = async () => {
            const res = await fetch("/api/data/links?limit=20");
            const json = await res.json();
            console.log(json);
            setLinks(json);
            setLoading(false);
        };

        updateLinks();
    }, []);

    return (
        <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {loading && <p className="text-center text-gray-600">Loading...</p>}

            {!loading && links.length > 0 && (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Similarity score</p>
                        <p className="text-3xl font-bold text-primary">{(links[0].similarity * 100).toFixed(1)}%</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border rounded-xl bg-gray-50">
                            <p className="text-sm text-gray-500 mb-1">Problem 1</p>
                            <p className="text-lg text-gray-800">{links[0].problem_1}</p>
                        </div>
                        <div className="p-4 border rounded-xl bg-gray-50">
                            <p className="text-sm text-gray-500 mb-1">Problem 2</p>
                            <p className="text-lg text-gray-800">{links[0].problem_2}</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={verifyLink}
                            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 cursor-pointer transition"
                        >
                            Accept
                        </button>
                        <button
                            onClick={dismissLink}
                            className="px-6 py-3 rounded-xl bg-error text-white font-semibold hover:brightness-110 cursor-pointer transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {!loading && links.length === 0 && <p className="text-center text-gray-500">No similar problems found.</p>}
        </section>
    );
}
