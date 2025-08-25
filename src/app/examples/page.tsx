import Image from "next/image";
import Link from "next/link";

export default function Examples() {
    return (
        <main className="mx-30 py-12 space-y-16">
            {/* Intro / pitch */}
            <section className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold text-secondary mb-4">Examples</h1>
                <p className="text-lg text-secondary/80">
                    See how founders use PainDB to spot real problems with traction — and turn them into products
                    faster.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white font-medium shadow-sm hover:opacity-90"
                    >
                        Try PainDB
                    </Link>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-secondary hover:bg-gray-100"
                    >
                        See Pricing
                    </Link>
                </div>
            </section>

            {/* Screenshot in a device-like frame */}
            <section className="max-w-6xl mx-auto">
                <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-yellow-400" />
                        <span className="h-3 w-3 rounded-full bg-green-400" />
                        <span className="ml-2 text-sm text-secondary/60">Pain Points — sample view</span>
                    </div>
                    <div className="relative">
                        {/* Put your provided image in /public/images/examples/painpoints.png */}
                        <Image
                            src="/images/teaser3.png"
                            alt="PainDB sample of high-signal pain points with validation scores"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
                <p className="mt-3 text-center text-sm text-secondary/60">
                    Real data view with searchable problems, timestamps, and validation scores.
                </p>
            </section>

            {/* What you can do */}
            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-primary text-center">What you can do with PainDB</h2>
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Find validated problems fast",
                            desc: "Search across thousands of high-signal pain points and sort by traction to avoid dead ends.",
                        },
                        {
                            title: "See evidence at a glance",
                            desc: "Each pain point is analyzed on popularity and recency so you can measure momentum without manual research.",
                        },
                        {
                            title: "Save for later",
                            desc: "Bookmark your favorite pain points so they’re easy to revisit and won’t get lost in the noise.",
                        },
                        {
                            title: "Spot patterns",
                            desc: "Compare related problems and validation scores to pick the most promising opportunity.",
                        },
                        {
                            title: "Reduce idea risk",
                            desc: "Build from verified demand, not gut feelings — shorten the path to profit.",
                        },
                        {
                            title: "Export data",
                            desc: "Save and export data for further analysis or share with your team to plan next steps.",
                        },
                    ].map((c) => (
                        <div
                            key={c.title}
                            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="font-semibold text-secondary">{c.title}</h3>
                            <p className="mt-2 text-secondary/80">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sample searches */}
            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-primary text-center">Example searches founders run</h2>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {[
                        '"spreadsheet" AND "collaboration"',
                        "SMB invoicing pain last 6 months",
                        "student finance + validation ≥ 5",
                        "AI content moderation workflow",
                        "developer onboarding friction",
                        "health tracking adherence issues",
                    ].map((q) => (
                        <span
                            key={q}
                            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-secondary/80"
                        >
                            {q}
                        </span>
                    ))}
                </div>
                <p className="mt-4 text-center text-secondary/70 text-sm">
                    Each search returns concrete problems with context and a validation score so you can prioritize
                    quickly.
                </p>
            </section>

            {/* Mini case studies */}
            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-primary text-center">From signal → idea in days, not months</h2>
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                    {[
                        {
                            tag: "Creator tooling",
                            title: "Sponsorship workflow chaos",
                            body: "Multiple posts cite messy email chains and no pricing clarity. High recent momentum. Result: prototype a lightweight sponsorship CRM focusing on rate cards + contracts.",
                            metric: "Validation 5.6",
                        },
                        {
                            tag: "Edtech",
                            title: "School group-work feels unfair",
                            body: "Students report uneven workload and grading angst. Consistent mentions over months. Result: MVP for transparent contribution tracking + feedback.",
                            metric: "Validation 4.6",
                        },
                        {
                            tag: "Personal finance",
                            title: "Switching banks is painful",
                            body: "Friction around recurring payments and salary redirects. Cross-regional mentions. Result: guided switching assistant and automatic checklist.",
                            metric: "Validation 5.2",
                        },
                    ].map((c) => (
                        <article key={c.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs rounded-full bg-gray-100 text-secondary px-2 py-1">
                                    {c.tag}
                                </span>
                                <span className="text-xs text-secondary/60">{c.metric}</span>
                            </div>
                            <h3 className="mt-3 font-semibold text-secondary">{c.title}</h3>
                            <p className="mt-2 text-secondary/80">{c.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Social proof / quick stats */}
            <section className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { k: "25k+", v: "curated pain points" },
                        { k: "Weekly", v: "fresh data updates" },
                        { k: "Minutes", v: "to a shortlist" },
                    ].map((s) => (
                        <div
                            key={s.v}
                            className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm"
                        >
                            <div className="text-4xl font-bold text-secondary">{s.k}</div>
                            <div className="mt-1 text-secondary/70">{s.v}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing CTA */}
            <section className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold text-secondary">Build what people already ask for.</h2>
                <p className="mt-3 text-secondary/80">
                    PainDB focuses exclusively on problem discovery — so you can focus on shipping the solution.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white font-medium shadow-sm hover:opacity-90"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/faq"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-secondary hover:bg-gray-100"
                    >
                        Read FAQ
                    </Link>
                </div>
            </section>
        </main>
    );
}
