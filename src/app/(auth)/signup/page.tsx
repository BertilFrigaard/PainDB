"use client";
import GithubContinueButton from "@/components/buttons/GithubContinueButton";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");

    console.log(searchParams.get("callbackUrl"));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        signIn("nodemailer", {
            email,
            redirectTo: searchParams.get("callbackUrl") || "/home",
        });
    };

    return (
        <main className="flex my-25 items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-md">
                <h1 className="text-4xl font-bold text-center">
                    Welcome to <br />
                    PainDB
                </h1>
                <p className="text-center text-secondary">
                    Access the Pain Point Database and start exploring — just enter your email below.
                </p>
                <ErrorMessage message={searchParams.get("error")} />
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
                <GithubContinueButton redirectTo={searchParams.get("callbackUrl") || "/home"} />
                <p className="text-center text-sm text-secondary">
                    By continuing, you agree to our{" "}
                    <a href="/terms-of-service" className="underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="underline">
                        Privacy Policy
                    </a>{" "}
                    .
                </p>
            </div>
        </main>
    );
}

function ErrorMessage({ message }: { message: string | null }) {
    const getMessage = () => {
        switch (message) {
            case "OAuthAccountNotLinked":
                return "Your account is not set up with Google. Please log in with email instead.";
            default:
                return "Something went wrong. If the issue persists, please contact support.";
        }
    };
    if (!message) {
        return null;
    } else {
        return <p className="text-center text-error font-semibold">{getMessage()}</p>;
    }
}
