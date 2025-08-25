import Link from "next/link";

export default function HelpSection() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-secondary mb-2">Help</h1>
                <p className="text-secondary">
                    Understanding the insights we provide is key to realizing its full potential. Therefore we provide
                    this guide which helps explain the insights and how to use them.
                </p>

                <div className="space-y-2">
                    <h2 className="font-bold text-xl text-secondary">Validation keyword</h2>
                    <p>
                        We use the term &quot;validation&quot; to represent both the traction a problem has gained and
                        the number of times it has been reported.
                    </p>
                    <p>
                        Each problem is assigned a &quot;validation&quot; score based on our dataset analysis. The score
                        is always above zero — a higher score indicates stronger potential, while a lower score suggests
                        weaker potential.
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-xl text-secondary">What to look for</h2>
                    <p>
                        When searching for the problem behind your next product, focus on those with a high validation
                        score. It can also be useful to review similar problems and compare their scores, which you can
                        do through the detailed problem view or by search.
                    </p>
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
