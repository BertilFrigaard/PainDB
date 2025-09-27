import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    const url = new URL("https://paindb.com/examples");

    return {
        title: "Examples",
        description: "Explore real examples from the PainDB pain point database and see how customer problems and market signals can help validate startup ideas.",
        openGraph: {
        type: "website",
        url: url.toString(),
        siteName: "PainDB",
        title: "Examples - PainDB",
        description: "Explore real examples from the PainDB pain point database and see how customer problems and market signals can help validate startup ideas."
,
        images: ["/seo/examples.png"], // 1200x630
        locale: "en_US",
    },
    }
}

export default function Examples() {
    return (
        <main className="mx-5 md:mx-30 py-12 space-y-16">
            {/* Intro / pitch */}
            <section className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold text-secondary mb-4">Examples</h1>
                <p className="text-lg text-secondary/80">
                    See how founders use PainDB to spot real problems with traction — and turn them into products
                    faster.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link
                        href="/#pricing"
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white font-medium shadow-sm hover:opacity-90"
                    >
                        Try PainDB
                    </Link>
                    <Link
                        href="/#pricing"
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
                            src="/images/teasers/data-view-2.png"
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

            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-primary text-center">Example Pain-Points</h2>
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Difficulty finding quality YouTube videos on making money.",
                            desc: "The author feels frustrated by the abundance of low-effort suggestions and sales pitches in money-making content, and is specifically seeking genuine recommendations for valuable YouTube channels or videos.",
                        },
                        {
                            title: "Need for high-quality text-to-voice engines for professional use.",
                            desc: "The author requires recommendations for text-to-voice engines that provide multiple character voices, can generate substantial audio files weekly (around 4000 words), handle voice tonality well, and fit within a cost-effective budget.",
                        },
                        {
                            title: "Transitioning to a WFH model may compromise work quality due to a lack of accountability.",
                            desc: "The author is worried that moving back to a WFH model will lead to the same issues of poor communication and slow work delivery as before, particularly because their team consists largely of freshers who may not take ownership of their tasks. This concern is exacerbated by recent staff layoffs and a downturn in business performance.",
                        },
                        {
                            title: "Need for reliable international business data",
                            desc: "The author is expanding their SaaS business into Europe and Asia but is struggling to find structured and compliant company data to create prospect lists, emphasizing the necessity for verified details rather than generic email lists.",
                        },
                        {
                            title: "Desire to avoid excessive social media use",
                            desc: "The author is frustrated with spending too much time on social media and is seeking alternative websites or resources that can provide value related to business instead.",
                        },
                        {
                            title: "Need help setting up an LLC to avoid double taxation.",
                            desc: "The author is seeking an accountant in Canada to assist in forming an LLC in the U.S. alongside their American partner. They want to ensure they do not face double taxation due to their cross-border business situation.",
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

            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-primary text-center">Detailed view</h2>
                <p className="max-w-[70%] m-auto text-center text-lg text-secondary/80">
                    Explorer every pain point further in our detailed view. Here you can see similar problems and also
                    get a more detailed explanation of the collected problem.
                </p>
                <div className="mt-8 rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-yellow-400" />
                        <span className="h-3 w-3 rounded-full bg-green-400" />
                        <span className="ml-2 text-sm text-secondary/60">Pain Points — sample view</span>
                    </div>
                    <div className="relative">
                        <Image
                            src="/images/teasers/detailed-view-2.png"
                            alt="PainDB sample of high-signal pain points with validation scores"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
                <p className="mt-3 text-center text-sm text-secondary/60">Detailed view of real data.</p>
            </section>

            {/* Sample searches */}
            {/* <section className="max-w-6xl mx-auto">
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
            </section> */}

            {/* Mini case studies */}
            {/* <section className="max-w-6xl mx-auto">
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
            </section> */}

            {/* Social proof / quick stats */}
            {/* <section className="max-w-6xl mx-auto">
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
            </section> */}

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
