import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "../buttons/DropDown";

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
                            <DropDown
                                items={[
                                    { text: "Advanced query", link: "/advanced-query" },
                                    { text: "Data Viewer", link: "/data-viewer" },
                                ]}
                            >
                                <p className="text-secondary cursor-pointer hover:text-primary duration-100">
                                    Features
                                </p>
                            </DropDown>
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
                    <DropDown items={[{ text: "Pricing" }, { text: "Sign Out", func: logOutClicked }]}>
                        <div className="flex items-center gap-2 font-semibold group cursor-pointer">
                            <div className="w-9 h-9 flex items-center text-lg justify-center bg-secondary text-white font-bold rounded-full">
                                {session.user.name?.charAt(0) ?? "U"}
                            </div>
                            <p className="relative text-secondary group-hover:after:w-full group-hover:after:opacity-100 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-secondary after:w-0 after:opacity-0 after:transition-all after:duration-300">
                                Om {session.user.name?.split(" ")[0]}
                            </p>

                            <IoIosArrowDown className="font-bold" />
                        </div>
                    </DropDown>
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
