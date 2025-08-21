"use client";
import { UseAlerts } from "@/contexts/AlertContext";
import { FormEvent, useState } from "react";

export default function ProfileSection() {
    const [feedback, setFeedback] = useState("");
    const { addAlert } = UseAlerts();

    const changeName = async (e: FormEvent) => {
        e.preventDefault();
        if (feedback.trim()) {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ feedback }),
            });
            if (res.status !== 204) {
                addAlert(
                    { message: "Failed to submit feedback (error code: " + res.status + ")", bg: "bg-error" },
                    3000
                );
            } else {
                setFeedback("");
                addAlert(
                    { message: "Thank you for your feedback. We will review it shortly!", bg: "bg-success" },
                    5000
                );
            }
        } else {
            addAlert({ message: "Please provide your feedback before submitting", bg: "bg-warn" }, 3000);
        }
    };
    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-secondary mb-2">Provide Feedback</h1>
                <p className="text-secondary">
                    We are very excited about gathering any feedback on our product. Your feedback is essential for
                    making PainDB even better!
                </p>
                {/* User Info */}
                <div>
                    <form onSubmit={changeName}>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                            Your feedback
                        </label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => {
                                setFeedback(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 min-h-60 resize-none"
                        ></textarea>
                        <input
                            value={"Submit"}
                            type="submit"
                            className="bg-primary rounded-xl text-white px-8 py-2 animating-button hover:bg-primary/90 flex items-center gap-1 mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
