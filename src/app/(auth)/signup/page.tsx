"use client";
import GithubContinueButton from "@/components/buttons/GithubContinueButton";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        signIn("nodemailer", {
            email,
            callbackUrl: "/home",
        });
    };

    return (
        <div className="flex mt-15 items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-md">
                <h1 className="text-4xl font-bold text-center">
                    Welcome to <br />
                    PainDB
                </h1>
                <p className="text-center text-secondary">
                    Access the Pain Point Database and start exploring — just enter your email below.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="px-3 block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-7 py-3 focus:border-primary focus:ring-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-primary px-7 py-3 text-white animating-button hover:bg-primary/90"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="mx-4 text-sm text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>
                <GithubContinueButton />
                <p className="text-center text-sm text-secondary">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
