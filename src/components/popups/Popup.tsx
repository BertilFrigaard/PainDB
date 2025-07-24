"use client";
import { ReactNode, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function Popup({
    children,
    exitFunc,
    title,
}: {
    children: ReactNode;
    exitFunc: () => void;
    title: string;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            exitFunc();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
        >
            <div
                ref={modalRef}
                className="w-full max-w-5xl rounded-3xl bg-background shadow-4xl p-0 relative border border-gray-100 flex flex-col md:flex-row"
            >
                <button
                    onClick={exitFunc}
                    className="absolute top-6 right-6 cursor-pointer text-gray-400 hover:text-primary transition-colors z-10 p-2 rounded-full bg-white shadow"
                    aria-label="Close"
                >
                    <IoClose size={28} />
                </button>
                <div className="flex-1 p-10 flex flex-col gap-8 bg-background rounded-3xl">
                    <h2 className="text-3xl font-bold text-secondary mb-2">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
}
