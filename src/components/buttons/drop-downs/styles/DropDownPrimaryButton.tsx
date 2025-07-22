"use client";

import DropDown from "../DropDown";
import { useState } from "react";

export default function DropDownPrimaryButton({
    text,
    items,
}: {
    text: string;
    items: { text: string; link?: string; func?: () => void }[];
}) {
    const [expanded, setExpanded] = useState(false);
    return (
        <DropDown expanded={expanded} setExpanded={setExpanded} items={items}>
            <button className="bg-primary rounded-xl text-white px-5 py-1 animating-button hover:bg-primary/90 flex items-center gap-1">
                {text}
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
            </button>
        </DropDown>
    );
}
