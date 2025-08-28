"use client";

import { UseAlerts } from "@/contexts/AlertContext";
import { Feedback } from "@/types/Feedback";
import { useEffect, useState } from "react";
import CustomTable from "../tables/CustomTable/CustomTable";
import { formatDatePrecise } from "@/lib/utils/formatter";

export default function FeedbackViewSection() {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(false);

    const { addAlert } = UseAlerts();

    const updateFeedback = async () => {
        setLoading(true);
        const res = await fetch("/api/feedback");
        if (res.status === 200) {
            const rows = await res.json();
            setFeedback(rows);
        } else {
            addAlert({ message: "Failed to get data (error code: " + res.status + ")", bg: "bg-error" }, 3000);
        }
        setLoading(false);
    };

    useEffect(() => {
        updateFeedback();
    }, []);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200 pb-15">
                <h1 className="text-3xl font-bold text-secondary text-center mb-10">User Feedback</h1>
                <CustomTable
                    columns={[
                        { index: "date", name: "Submitted At" },
                        { index: "user", name: "Submitted by" },
                        { index: "feedback", name: "Feedback" },
                    ]}
                    data={feedback.map((v) => {
                        return {
                            date: formatDatePrecise(v.created_at),
                            user: v.user_id.toString(),
                            feedback: v.feedback,
                        };
                    })}
                />
                {loading && <p className="text-center p-10 font-bold text-lg text-gray-500">Loading</p>}
            </div>
        </>
    );
}
