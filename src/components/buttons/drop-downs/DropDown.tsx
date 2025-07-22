"use client";
import Link from "next/link";
import { ReactNode, useRef, useEffect } from "react";

export default function DropDown({
    children,
    items,
    expanded,
    setExpanded,
}: {
    children: ReactNode;
    items: { text: string; link?: string; func?: () => void }[];
    expanded: boolean;
    setExpanded: (arg0: boolean) => void;
}) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        };

        if (expanded) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expanded, setExpanded]);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <div onClick={() => setExpanded(!expanded)} className="flex items-center">
                {children}
            </div>
            {expanded && (
                <div className="absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10 translate-y-4 -translate-x-4">
                    <div>
                        {items.map((item, index) => {
                            const classes =
                                "block px-4 py-3 text-sm text-gray-700 cursor-pointer transition hover:bg-gray-100 " +
                                (index === 0 ? "rounded-t-md" : index === items.length - 1 ? "rounded-b-md" : "");

                            if (item.link) {
                                return (
                                    <Link
                                        href={item.link}
                                        key={index}
                                        onClick={() => setExpanded(false)}
                                        className={classes}
                                    >
                                        {item.text}
                                    </Link>
                                );
                            } else if (item.func) {
                                return (
                                    <p
                                        key={index}
                                        onClick={() => {
                                            setExpanded(false);
                                            item.func?.();
                                        }}
                                        className={classes}
                                    >
                                        {item.text}
                                    </p>
                                );
                            } else {
                                return (
                                    <p
                                        key={index}
                                        className={
                                            "block px-4 py-3 text-sm text-gray-700 bg-black/10 " +
                                            (index === 0
                                                ? "rounded-t-md"
                                                : index === items.length - 1
                                                ? "rounded-b-md"
                                                : "")
                                        }
                                    >
                                        {item.text}
                                    </p>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
