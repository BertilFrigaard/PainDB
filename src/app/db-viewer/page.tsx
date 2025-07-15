"use client";
import PainPointTable from "@/components/tables/PainPointTable/PainPointTable";
import { PainPoint } from "@/types/PainPoint";
import { useEffect, useState } from "react";

export default function DBViewer() {
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
        <div className="mx-20">
            <h1>Pain Points</h1>
            <section>
                <h2>View Data</h2>
                {loading ? <p>Loading...</p> : <PainPointTable painPoints={painPoints} />}
            </section>
        </div>
    );
}
