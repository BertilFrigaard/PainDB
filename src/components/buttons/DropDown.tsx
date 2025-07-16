"use client";
import Link from "next/link";
import { useState, ReactNode } from "react";

export default function DropDown({
    children,
    items,
}: {
    children: ReactNode;
    items: { text: string; link?: string | undefined; func?: (() => void) | undefined }[];
}) {
    const [expanded, setExpanded] = useState(false);
    return (
        <>
            <div
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                {children}
            </div>
            {expanded && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10 translate-y-6 -translate-x-4">
                    <div>
                        {items.map((item, index) => {
                            const baseStyle =
                                "block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition";

                            if (item.link) {
                                return (
                                    <Link href={item.link} key={index} className={baseStyle}>
                                        {item.text}
                                    </Link>
                                );
                            } else if (item.func) {
                                return (
                                    <p onClick={item.func} key={index} className={baseStyle}>
                                        {item.text}
                                    </p>
                                );
                            } else {
                                return (
                                    <p key={index} className={`${baseStyle} opacity-50 cursor-default`}>
                                        {item.text}
                                    </p>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
