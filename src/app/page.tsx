import { pageMaxRole } from "@/lib/utils/roleRestrictions";
import Image from "next/image";
import Link from "next/link";

export default async function Landing() {
    await pageMaxRole({});
    return (
        <main className="bg-background min-h-[90vh]">
            <section className="px-36 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-y-12 gap-x-16">
                    {/* Left Text Section */}
                    <div className="space-y-10 text-center lg:text-left">
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-6xl font-bold text-secondary leading-tight">
                                Build with confidence <br /> Skip the guesswork
                            </h1>
                            <p className="text-lg sm:text-xl text-secondary">
                                Access thousands of real-world pain points to validate your next idea before writing a
                                single line of code.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/signup"
                                className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:brightness-110 transition"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/learn"
                                className="px-8 py-4 rounded-2xl border border-gray-400 text-black font-semibold hover:bg-gray-100 transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="flex-1/2 relative min-h-[300px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/showcase_landing.png"
                            alt="Showcase Landing"
                            fill
                            className="rounded-xl shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>
            <section>
                <div className="bg-[#023347] px-36 py-20">
                    <h2 className="text-2xl font-bold text-primary">Pricing</h2>
                    <h3 className="text-4xl font-semibold text-white max-w-[60%]">
                        Start building apps that users actually need, with instant access to market insights. Start
                        finding your next big idea today.
                    </h3>
                </div>
            </section>
            <section className="px-36 py-20 text-center bg-white">
                <div>
                    <h2 className="text-2xl font-bold text-primary">Pricing</h2>
                    <h3 className="mx-auto text-4xl font-semibold text-secondary max-w-[80%] mb-12">
                        Start building apps that users actually need, with instant access to valuable market insights.
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200">
                            <h4 className="text-xl font-bold text-secondary mb-2">Starter</h4>
                            <p className="text-4xl font-extrabold text-primary mb-2">$29</p>
                            <p className="text-gray-500 mb-6">One-time payment, lifetime access</p>
                            <ul className="text-gray-700 mb-8 space-y-2 text-left">
                                <li>✔ Access to 300+ pain points</li>
                                <li>✔ Advanced search & filter</li>
                                <li>✔ Email support</li>
                            </ul>
                            <Link
                                href="/signup"
                                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 transition"
                            >
                                Get Starter
                            </Link>
                        </div>
                        {/* Pro Plan */}
                        <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center border-2 border-primary scale-105">
                            <h4 className="text-xl font-bold text-secondary mb-2">Pro</h4>
                            <p className="text-4xl font-extrabold text-primary mb-2">$59</p>
                            <p className="text-gray-500 mb-6">One-time payment, lifetime access</p>
                            <ul className="text-gray-700 mb-8 space-y-2 text-left">
                                <li>✔ Everything in Starter</li>
                                <li>✔ Access to all pain points</li>
                                <li>✔ Advanced search & analytics</li>
                                <li>✔ Priority email support</li>
                            </ul>
                            <Link
                                href="/signup"
                                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 transition"
                            >
                                Get Pro
                            </Link>
                        </div>
                        {/* Team Plan */}
                        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200">
                            <h4 className="text-xl font-bold text-secondary mb-2">Unlimited</h4>
                            <p className="text-4xl font-extrabold text-primary mb-2">$89</p>
                            <p className="text-gray-500 mb-6">One-time payment, lifetime access</p>
                            <ul className="text-gray-700 mb-8 space-y-2 text-left">
                                <li>✔ Everything in Pro</li>
                                <li>✔ Up to 5 team members</li>
                                <li>✔ Team collaboration tools</li>
                                <li>✔ Dedicated support</li>
                            </ul>
                            <Link
                                href="/signup"
                                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 transition"
                            >
                                Get Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
