"use client";
import { PainPoint } from "@/types/PainPoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewPainPoint() {
    const params = useParams<{ id: string }>();
    const [painPoint, setPainPoint] = useState<null | PainPoint>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateData = async () => {
            const res = await fetch("/api/data/" + params.id);
            console.log(await res.json());
        };

        updateData();
    }, [params.id]);

    return <h1>{params.id}</h1>;
}
