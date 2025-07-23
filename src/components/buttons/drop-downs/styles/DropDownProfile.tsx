"use client";

import { signOut } from "next-auth/react";
import DropDown from "../DropDown";
import { useState } from "react";

export default function DropDownProfile({ name }: { name: string }) {
    const [expanded, setExpanded] = useState(false);

    const logOutClicked = async () => {
        await signOut({ redirectTo: "/" });
    };

    const items = [
        { text: "Profile", link: "/profile" },
        { text: "Sign Out", func: logOutClicked },
    ];

    return (
        <DropDown expanded={expanded} setExpanded={setExpanded} items={items}>
            <div className="flex items-center gap-2 font-semibold group cursor-pointer">
                <div className="w-9 h-9 flex items-center text-lg justify-center bg-secondary text-white font-bold rounded-full">
                    {name.charAt(0)}
                </div>
                <p className="relative text-secondary group-hover:after:w-full group-hover:after:opacity-100 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-secondary after:w-0 after:opacity-0 after:transition-all after:duration-300">
                    {name.split(" ")[0]}
                </p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`font-bold transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                >
                    <path d="m6 9 6 6 6-6"></path>
                </svg>
            </div>
        </DropDown>
    );
}
