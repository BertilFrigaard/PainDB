import { auth } from "@/auth";
import Link from "next/link";
import DropDownPlain from "../buttons/drop-downs/styles/DropDownPlain";
import DropDownProfile from "../buttons/drop-downs/styles/DropDownProfile";

export default async function Header() {
    const session = await auth();

    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-background">
            <div className="flex items-center space-x-20">
                <Link className="text-3xl font-bold text-secondary" href={session?.user ? "/home" : "/"}>
                    PainDB
                </Link>
                <div className="flex space-x-8">
                    {session?.user.role && session?.user.role !== "none" ? (
                        <>
                            <Link className="text-secondary" href="/home">
                                Home
                            </Link>
                            <Link className="text-secondary" href="/db-viewer">
                                DB Viewer
                            </Link>
                            {session?.user.role === "admin" && (
                                <DropDownPlain
                                    text="Admin"
                                    items={[
                                        { text: "Manage Pipelines", link: "/admin/manage-pipelines" },
                                        { text: "Manage Validation Scores", link: "/admin/validation-score" },
                                    ]}
                                />
                            )}
                            <Link className="text-secondary" href="/help">
                                Help
                            </Link>
                        </>
                    ) : (
                        <>
                            <DropDownPlain
                                text="Features"
                                items={[
                                    { text: "Advanced query", link: "/advanced-query" },
                                    { text: "Data Viewer", link: "/data-viewer" },
                                ]}
                            />
                            <Link className="text-secondary" href="/examples">
                                Examples
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
                    <DropDownProfile name={session.user.name ? session.user.name : "You"} />
                ) : (
                    <>
                        <Link
                            className="px-7 py-3 border border-gray-500 rounded-2xl animating-button hover:bg-gray-200"
                            href={"/signup"}
                        >
                            Login
                        </Link>
                        <Link
                            className="px-7 py-3 rounded-2xl bg-primary text-white animating-button hover:bg-primary/90"
                            href={"/signup"}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
