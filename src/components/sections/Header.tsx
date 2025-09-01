import { auth } from "@/auth";
import Link from "next/link";
import DropDownPlain from "../buttons/drop-downs/styles/DropDownPlain";
import DropDownProfile from "../buttons/drop-downs/styles/DropDownProfile";
import DropDownBurger from "../buttons/drop-downs/styles/DropDownBurger";

export default async function Header() {
    const session = await auth();

    const items: { text: string; link?: string; func?: () => void }[] = [];

    if (session?.user.role && session?.user.role !== "none") {
        items.push({ text: "Home", link: "/home" });
        items.push({ text: "DB Viewer", link: "/db-viewer" });
        items.push({ text: "Help", link: "/help" });
        if (session?.user.role == "admin") {
            items.push({ text: "Manage Pipelines", link: "/admin/manage-pipelines" });
            items.push({ text: "View Feedback", link: "/admin/view-feedback" });
            items.push({ text: "Manage Validation Scores", link: "/admin/validation-score" });
        }
        items.push({ text: "Profile", link: "/profile" });
        items.push({ text: "Sign Out", link: "/signout" });
    } else {
        items.push({ text: "Home", link: "/" });
        items.push({ text: "Examples", link: "/examples" });
        items.push({ text: "Pricing", link: "/#pricing" });
        items.push({ text: "FAQ", link: "/faq" });
        items.push({ text: "Sign In", link: "/signup" });
    }

    return (
        <nav className="flex space-x-5 md:justify-between items-center px-10 py-5 bg-background sticky top-0 z-50">
            <div className="md:hidden">
                <DropDownBurger items={items} />
            </div>
            <div className="flex items-center space-x-20">
                <Link className="text-3xl font-bold text-secondary" href={session?.user ? "/home" : "/"}>
                    PainDB
                </Link>
                <div className="space-x-8 hidden md:flex">
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
                                        { text: "View Feedback", link: "/admin/view-feedback" },
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
                            <Link className="text-secondary" href="/">
                                Home
                            </Link>
                            <Link className="text-secondary" href="/examples">
                                Examples
                            </Link>
                            <Link className="text-secondary" href="/#pricing">
                                Pricing
                            </Link>
                            <Link className="text-secondary" href="/faq">
                                FAQ
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="hidden space-x-4 md:flex">
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
