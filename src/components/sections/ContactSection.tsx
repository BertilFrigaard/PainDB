import Link from "next/link";

export default function ContactSection() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-secondary mb-2">Contact</h1>
                <p className="text-secondary">
                    Remember that many questions are already answered in our{" "}
                    <Link className="underline" href={"/faq"}>
                        FAQ
                    </Link>
                    . Otherwise please write, and we will be happy to answer whatever question you have in mind.
                </p>

                <div className="space-y-2">
                    <h2 className="font-bold text-xl text-secondary">Contact Details</h2>
                    <ul>
                        <li>support@paindb.com</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
