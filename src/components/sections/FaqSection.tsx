"use client";

import Link from "next/link";

export default function FaqSection() {
    const faqs = [
        {
            question: "What is PainDB?",
            answer: "PainDB is a database of real-world user pain points collected from public sources, designed to help you validate product ideas faster.",
        },
        {
            question: "Why use PainDB?",
            answer: "Unlike general research tools, PainDB is dedicated exclusively to uncovering real, validated problems. Because we focus on this single mission, our algorithms deliver highly accurate insights and give you the best possible chance of finding your next big idea.",
        },

        {
            question: "How often is the data updated?",
            answer: "We refresh our datasets regularly to ensure you always have access to the most recent and relevant insights.",
        },
        {
            question: "Do I need an account to use PainDB?",
            answer: "Yes, PainDB is a paid service, and you will therefore need to create an account in order for us to verify that you have purchased access to our platform.",
        },
    ];

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-secondary mb-2">FAQ</h1>
                <p className="text-secondary">
                    Here we have collected many of the frequently asked questions for you to browse.
                </p>

                <div className="mt-6 space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                            <h2 className="text-lg font-semibold text-secondary">{faq.question}</h2>
                            <p className="text-secondary/80 mt-2">{faq.answer}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-primary font-semibold">
                    If you have any other questions feel free to{" "}
                    <Link className="underline" href="/contact">
                        contact us
                    </Link>
                </p>
            </div>
        </>
    );
}
