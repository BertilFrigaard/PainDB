"use client";

import DropDown from "../DropDown";
import { useState } from "react";

export default function DropDownSecondaryButton({
    text,
    items,
}: {
    text: string;
    items: { text: string; link?: string; func?: () => void }[];
}) {
    const [expanded, setExpanded] = useState(false);
    return (
        <DropDown expanded={expanded} setExpanded={setExpanded} items={items}>
            <button className="border-1 border-secondary rounded-xl px-5 py-1 flex items-center gap-1 animating-button hover:bg-gray-200">
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
