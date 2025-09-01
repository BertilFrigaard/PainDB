"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
    useEffect(() => {
        signOut({ redirectTo: "/" });
    }, []);
    return (
        <main className="h-[80vh] flex flex-col items-center justify-center p-10 text-center bg-white text-gray-800">
            <h2 className="text-3xl font-bold mt-4 mb-6">Signing Out</h2>
            <p className="text-gray-600 mb-8">You will be redirected shortly</p>
        </main>
    );
}
