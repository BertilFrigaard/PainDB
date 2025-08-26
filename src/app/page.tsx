import Image from "next/image";
import Link from "next/link";

// Optional: pass `session` as prop or read from your auth context
export default function Landing() {
    return (
        <main className="bg-background text-secondary">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 " />
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-28">
                    <div className="grid lg:grid-cols-2 gap-y-14 gap-x-16 items-center">
                        {/* Left */}
                        <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 backdrop-blur px-3 py-1 text-sm text-primary shadow-sm">
                                <span className="i-lucide-sparkles" />
                                <span>Validated pains • Real users • Fresh insights</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] text-secondary">
                                Build with confidence
                                <br />
                                <span className="text-primary">Skip the guesswork</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-secondary/80 max-w-2xl mx-auto lg:mx-0">
                                Access thousands of real-world pain points to validate your next idea quickly and before
                                writing a single line of code.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                                <Link
                                    href="/signup"
                                    className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:brightness-110 transition"
                                >
                                    Get Started
                                    <svg
                                        className="size-5 transition -translate-x-0 group-hover:translate-x-0.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/learn"
                                    className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="order-1 lg:order-2 relative">
                            {/* Mocked browser frame */}
                            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 h-10 border-b border-gray-100 bg-gray-50">
                                    <span className="size-3 rounded-full bg-red-400" />
                                    <span className="size-3 rounded-full bg-amber-400" />
                                    <span className="size-3 rounded-full bg-emerald-400" />
                                    <div className="ml-3 text-xs text-gray-500 truncate">
                                        paindb • pains / analytics preview
                                    </div>
                                </div>
                                <div className="relative aspect-[16/10]">
                                    <Image
                                        src="/images/showcase_landing.png"
                                        alt="PainDB preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Glow */}
                            <div className="pointer-events-none absolute -inset-x-10 -bottom-10 h-40 bg-primary/20 blur-3xl" />
                        </div>
                    </div>
                </div>

                {/* subtle divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </section>

            {/* WHY / MESSAGE */}
            <section className="bg-secondary">
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20">
                    <h2 className="text-2xl font-bold text-primary">Why PainDB</h2>
                    <p className="mt-6 text-3xl md:text-4xl font-semibold text-white max-w-4xl">
                        Start building apps that users actually need with instant access to market insights. Find your
                        next big idea today.
                    </p>
                </div>
            </section>

            {/* VALUE CARDS */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20">
                    <p className="mt-2 text-4xl font-bold text-secondary">PainDB helps you</p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-semibold text-secondary">{c.title}</h3>
                                </div>
                                <p className="mt-3 text-secondary/70">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEM */}
            <section className="bg-secondary">
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20">
                    <h2 className="text-2xl font-bold text-primary">The Problem</h2>
                    <p className="mt-6 text-3xl md:text-4xl font-semibold text-white max-w-4xl">
                        Too many developers build without validating their ideas first. This contributes to over{" "}
                        <span className="text-error">99%</span> of apps never finding product–market fit.
                    </p>
                </div>
            </section>

            {/* WHAT WE DO */}
            <section className="bg-white">
                <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20 text-center">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">What we do</h2>
                        <h3 className="mt-4 text-3xl md:text-4xl font-semibold text-secondary leading-tight">
                            Validate ideas with real market signals — before you write a single line of code.
                        </h3>
                        <p className="mt-4 text-secondary/80 text-lg max-w-2xl">
                            PainDB aggregates high-signal user pain points, then enriches them so you can search, filter
                            and spot patterns fast. Focus on building the solution — not hunting for the problem.
                        </p>

                        {/* Stats / social proof */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                            {[
                                { k: "Pains indexed", v: "5k+" },
                                { k: "Sources", v: "25+" },
                                { k: "Last update", v: "Yesterday" },
                            ].map((s) => (
                                <div key={s.k} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="text-2xl font-extrabold text-secondary">{s.v}</div>
                                    <div className="text-sm text-secondary/60">{s.k}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="bg-bg py-10">
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-10">
                    <h2 className="text-2xl font-bold text-primary">Our process</h2>
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        {[
                            { n: 1, t: "Collect", d: "We continuously gather user pains from high-signal sources." },
                            { n: 2, t: "Enrich", d: "We clean, classify, and cluster pains to surface patterns." },
                            { n: 3, t: "Deliver", d: "You explore via search & filters — or download to go deeper." },
                        ].map((s) => (
                            <div key={s.t} className="relative rounded-2xl border border-gray-200 p-6 bg-white">
                                <div className="absolute -top-3 -left-3 h-10 w-10 rounded-xl bg-primary text-white grid place-items-center font-bold shadow">
                                    {s.n}
                                </div>
                                <h3 className="text-xl font-semibold text-secondary">{s.t}</h3>
                                <p className="mt-2 text-secondary/70">{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="px-6 md:px-12 lg:px-16 xl:px-24 py-20 bg-white text-center">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-primary mb-4">Pricing</h2>
                    <h3 className="mx-auto text-2xl md:text-4xl font-semibold text-secondary max-w-3xl mb-14">
                        Start building apps users actually need — with instant access to market insights.
                    </h3>

                    <div className="mx-auto max-w-md bg-white rounded-2xl shadow-2xl p-10 border-2 border-primary will-change-transform hover:scale-[1.02] transition-transform">
                        <h4 className="text-2xl font-bold text-secondary mb-2">Pro</h4>
                        <div className="flex items-end gap-3 mb-2 justify-center">
                            <p className="text-2xl text-gray-400 line-through">$19</p>
                            <p className="text-4xl font-extrabold text-primary">$9</p>
                        </div>
                        <p className="text-gray-500 mb-8">One-time payment, lifetime access</p>

                        <ul className="text-gray-700 space-y-3 text-center mb-10">
                            <li>✔ Access to all pain points</li>
                            <li>✔ Download data as CSV</li>
                            <li>✔ Advanced search & analytics</li>
                            <li>✔ Priority email support</li>
                        </ul>

                        <Link
                            href={"/"}
                            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:brightness-110 transition"
                        >
                            Get Pro
                        </Link>

                        <p className="mt-4 text-xs text-secondary/60">Secure checkout through Stripe</p>
                    </div>
                </div>
            </section>

            {/* CTA FOOTER */}
            <section className="relative overflow-hidden bg-secondary">
                <div className="absolute inset-0 " />
                <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Stop guessing. Start validating.</h2>
                    <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                        Join other developers using PainDB to find problems worth solving — and ship with confidence.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/signup"
                            className="px-7 py-4 rounded-2xl bg-primary text-white font-semibold hover:brightness-110 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/learn"
                            className="px-7 py-4 rounded-2xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
