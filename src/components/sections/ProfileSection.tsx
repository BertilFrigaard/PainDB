"use client";
import { UseAlerts } from "@/contexts/AlertContext";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";

export default function ProfileSection({ session }: { session: Session }) {
    const [username, setUsername] = useState(session.user.name || "");
    const { addAlert } = UseAlerts();

    const changeName = async (e: FormEvent) => {
        e.preventDefault();
        if (username !== session.user.name) {
            const res = await fetch("/api/profile/name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: username }),
            });
            if (res.status !== 204) {
                addAlert({ message: "Failed to change name (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            } else {
                window.location.reload();
            }
        }
    };

    if (!session) {
        addAlert({ message: "Something went wrong. Try reloading the page", bg: "bg-error" }, 3000);
        return;
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-secondary mb-8">Your Profile</h1>
                {/* User Info */}
                <div>
                    <form onSubmit={changeName}>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                        />
                        {username !== (session.user.name || "") && (
                            <input
                                value={"Change name"}
                                type="submit"
                                className="bg-primary rounded-xl text-white px-5 py-2 animating-button hover:bg-primary/90 flex items-center gap-1 mt-5"
                            />
                        )}
                    </form>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value="*******@*****"
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                    />
                </div>

                {/* Plan Info */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-secondary font-bold mb-1">Current Plan</p>
                    <span className="text-4xl font-extrabold text-primary">
                        {session.user.role && session.user.role !== "none"
                            ? session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)
                            : "Guest"}
                    </span>
                </div>
            </div>
        </>
    );
}
