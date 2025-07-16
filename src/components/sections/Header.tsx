import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Header() {
    const session = await auth();

    const signInClicked = async () => {
        "use server";
        await signIn();
    };
    const logOutClicked = async () => {
        "use server";
        await signOut();
    };

    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-background">
            <div className="flex items-center space-x-20">
                <Link className="text-3xl font-bold text-secondary" href={session?.user ? "/home" : "/"}>
                    PainDB
                </Link>
                <div className="flex space-x-8">
                    {session?.user ? (
                        <>
                            <Link className="text-secondary" href="/home">
                                Home
                            </Link>
                            <Link className="text-secondary" href="/db-viewer">
                                DB Viewer
                            </Link>
                            <Link className="text-secondary" href="/help">
                                Help
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="text-secondary" href="/features">
                                Features
                            </Link>
                            <Link className="text-secondary" href="/example">
                                Example
                            </Link>
                            <Link className="text-secondary" href="/faq">
                                FAQ
                            </Link>
                            <Link className="text-secondary" href="/pricing">
                                Pricing
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="flex space-x-4">
                {session?.user ? (
                    <button
                        className="px-7 py-3 bg-primary text-white rounded-2xl animating-button hover:bg-primary/90"
                        onClick={logOutClicked}
                    >
                        Log Out
                    </button>
                ) : (
                    <>
                        <button
                            className="px-7 py-3 border border-gray-500 rounded-2xl animating-button hover:bg-gray-200"
                            onClick={signInClicked}
                        >
                            Login
                        </button>
                        <button
                            className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90"
                            onClick={signInClicked}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
