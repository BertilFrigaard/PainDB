import { auth } from "@/auth";
import { getCountPainPoints } from "@/lib/services/dataService";
import { getCountPipelines, getLastRun } from "@/lib/services/pipelineService";
import { ensureEnv } from "@/lib/utils/envEnsurer";
import { getRelativeTime } from "@/lib/utils/formatter";
import { pageMaxRole } from "@/lib/utils/roleRestrictions";
import { Target, FileText, Gauge } from "lucide-react";
import Link from "next/link";

ensureEnv(["STRIPE_SHOP_STANDARD_LINK"]);

export default async function Landing() {
    const session = await auth();
    await pageMaxRole({ role: "none", redirectUsers: "/home", session: session });

    const stats = [];

    try {
        stats.push({ k: "Pains indexed", v: Math.floor((await getCountPainPoints()) / 1000) + "k+" });
    } catch {
        stats.push({ k: "Pains indexed", v: "?" });
    }

    try {
        stats.push({ k: "Sources", v: Math.floor((await getCountPipelines()) / 5) * 5 + "+" });
    } catch {
        stats.push({ k: "Sources", v: "?" });
    }

    try {
        const lastRun = await getLastRun();
        if (lastRun) {
            stats.push({ k: "Last Update", v: getRelativeTime(new Date(lastRun)) });
        } else {
            stats.push({ k: "Updates", v: "weekly" });
        }
    } catch (e) {
        console.log(e);
        stats.push({ k: "Updates", v: "weekly" });
    }

    console.log(session?.user.role);

    return (
        <main className="bg-background text-secondary">
            {/* HERO */}
            <section className="relative bg-[url(/images/world1.png)] bg-center bg-cover">
                {/* Foreground content */}
                <div className="backdrop-blur-xs bg-white/20">
                    <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 pt-5 pb-10 md:py-20 lg:py-28">
                        <div className="grid lg:grid-cols-2 gap-y-14 gap-x-16 items-center">
                            {/* Left */}
                            <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 border-primary/30 px-3 py-1 text-sm text-primary shadow-sm">
                                    <span className="i-lucide-sparkles" />
                                    <span>
                                        Validated pains • Real users{" "}
                                        <span className="hidden md:inline">• Fresh insights</span>
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] text-secondary">
                                    Build with confidence
                                    <br />
                                    <span className="text-primary">Skip the guesswork</span>
                                </h1>

                                <p className="text-lg sm:text-xl text-secondary/80 max-w-2xl mx-auto lg:mx-0">
                                    Access thousands of real-world pain points to validate your next idea quickly and
                                    before writing a single line of code.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                                    <Link
                                        href={session?.user.role ? "#pricing" : "/signup"}
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
                                        href="#paindb-helps-you"
                                        className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
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
                    <p className="mt-6 text-3xl md:text-4xl font-semibold text-white max-w-4xl" id="paindb-helps-you">
                        Start building apps that users actually need with instant access to market insights. Find your
                        next big idea today.
                    </p>
                </div>
            </section>

            {/* VALUE CARDS */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20">
                    <p className="md:mt-2 text-3xl md:text-4xl font-bold text-secondary">PainDB helps you</p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Find validated problems fast",
                                desc: "Search across thousands of high-signal pain points and sort by traction to avoid dead ends.",
                            },
                            {
                                title: "See evidence at a glance",
                                desc: "Each pain point is analyzed on popularity, recency and actionability so you can measure momentum without manual research.",
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
                                <p className="mt-3 text-secondary/70" id="the-problem">
                                    {c.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Link To Examples */}
            <section className="bg-bg" id="what-you-get">
                <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20 text-center">
                    <header className="space-y-3 pb-8">
                        <h2 className="text-2xl font-bold text-primary">Real Problems</h2>
                        <h3 className="mt-1 text-3xl md:text-4xl font-semibold text-secondary leading-tight">
                            See real examples from our Database
                        </h3>
                        <p className="mx-auto max-w-3xl text-base md:text-lg text-secondary/80">
                            Curious what our data looks like? Get a sneak peek into our database and explore how real
                            user pain points can help you build better and faster!
                        </p>
                    </header>
                    <Link
                        href="/examples"
                        className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:brightness-110 transition"
                    >
                        View Examples
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
            <section className="bg-white" id="what-we-do">
                <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20 text-center">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">What we do</h2>
                        <h3 className="mt-4 text-3xl md:text-4xl font-semibold text-secondary leading-tight">
                            Validate ideas with real market signals — before you write a single line of code
                        </h3>
                        <p className="mt-4 text-secondary/80 text-lg max-w-2xl">
                            PainDB aggregates high-signal user pain points, then enriches them so you can search, filter
                            and spot patterns fast. Focus on building the solution — not hunting for the problem.
                        </p>

                        {/* Stats / social proof */}
                        <div className="mt-8 grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl hidden sm:grid">
                            {stats.map((s) => (
                                <div key={s.k} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="text-2xl font-extrabold text-secondary">{s.v}</div>
                                    <div className="text-sm text-secondary/60">{s.k}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET */}
            <section className="bg-bg" id="what-you-get">
                <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20 text-center">
                    <header className="space-y-3">
                        <h2 className="text-2xl font-bold text-primary">What you get</h2>
                        <h3 className="mt-1 text-3xl md:text-4xl font-semibold text-secondary leading-tight">
                            Access to real problems that are ready to build for.
                        </h3>
                        <p className="mx-auto max-w-3xl text-base md:text-lg text-secondary/80">
                            Every entry includes a distilled <span className="font-semibold">key problem</span>, a
                            concise
                            <span className="font-semibold"> description</span> for context, and a signal-weighted
                            <span className="font-semibold"> validation score</span> so you can prioritize fast.
                        </p>
                    </header>

                    {/* Feature cards */}
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                        <div className="rounded-2xl border border-primary/15 bg-white/70 backdrop-blur p-6 shadow-sm">
                            <div className="flex gap-4">
                                <Target className="mb-4 text-2xl text-primary" aria-hidden />
                                <h4 className="text-lg font-semibold text-secondary">Key Problem</h4>
                            </div>
                            <p className="mt-2 text-secondary/80">
                                A crisp, one-line statement of the user’s pain, ready for ideation.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-primary/15 bg-white/70 backdrop-blur p-6 shadow-sm">
                            <div className="flex gap-4">
                                <FileText className="mb-4 text-2xl text-primary" aria-hidden />
                                <h4 className="text-lg font-semibold text-secondary">Description</h4>
                            </div>
                            <p className="mt-2 text-secondary/80">
                                A short summary that adds context—what’s happening, why it matters, and who’s affected.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-primary/15 bg-white/70 backdrop-blur p-6 shadow-sm">
                            <div className="flex gap-4">
                                <Gauge className="mb-4 text-2xl text-primary" aria-hidden />
                                <h4 className="text-lg font-semibold text-secondary">Validation Score</h4>
                            </div>
                            <p className="mt-2 text-secondary/80">
                                A score that reflects how actionable the problem is, helping you rank opportunities.
                            </p>
                        </div>
                    </div>

                    {/* Optional reassurance line */}
                    <p className="mt-10 text-sm text-secondary/70">
                        Access to PainDB is access to a curated database of pain points—each <br />
                        with a key problem, description, and validation score.
                    </p>
                </div>
            </section>

            {/* PROCESS */}
            <section className="bg-secondary py-10">
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-10">
                    <h2 className="text-2xl font-bold text-primary">Our Process</h2>
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        {[
                            { n: 1, t: "Collect", d: "We continuously gather user pains from high-signal sources." },
                            { n: 2, t: "Enrich", d: "We clean, classify, and cluster pains to surface patterns." },
                            { n: 3, t: "Deliver", d: "You explore via search & filters — or download to go deeper." },
                        ].map((s) => (
                            <div key={s.t} className="relative rounded-2xl border border-gray-200 p-6 bg-background">
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
                        Start building apps users actually need — with instant access to market insights
                    </h3>

                    <div className="mx-auto max-w-sm bg-white rounded-2xl shadow-2xl p-10 border-2 border-primary">
                        <h4 className="text-2xl font-bold text-secondary mb-2">PainDB</h4>
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
                            href={
                                session
                                    ? process.env.STRIPE_SHOP_STANDARD_LINK!
                                    : "/signup?callbackUrl=" + (process.env.STRIPE_SHOP_STANDARD_LINK || "/home")
                            }
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
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Stop guessing - Start validating</h2>
                    <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                        Join other developers using PainDB to find problems worth solving — and ship with confidence.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={session?.user.role ? "#pricing" : "/signup"}
                            className="px-7 py-4 rounded-2xl bg-primary text-white font-semibold hover:brightness-110 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/faq"
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
