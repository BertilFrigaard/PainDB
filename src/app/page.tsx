import { auth } from "@/auth";
import { pageMaxRole } from "@/lib/utils/roleRestrictions";
import Image from "next/image";
import Link from "next/link";

export default async function Landing() {
    const session = await auth();
    await pageMaxRole({ session: session });
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
            <section className="px-6 md:px-20 lg:px-36 py-20 bg-white text-center">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-4">Pricing</h2>
                    <h3 className="mx-auto text-2xl md:text-4xl font-semibold text-secondary max-w-3xl mb-16">
                        Start building apps that users actually need, with instant access to valuable market insights.
                    </h3>

                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-10 border-2 border-primary scale-105 hover:scale-[1.06] transition-transform">
                        <h4 className="text-2xl font-bold text-secondary mb-2">Pro</h4>
                        <div className="flex items-end gap-3 mb-2 justify-center">
                            <p className="text-2xl text-gray-400 line-through">$19</p>
                            <p className="text-4xl font-extrabold text-primary">$9</p>
                        </div>
                        <p className="text-gray-500 mb-8">One-time payment, lifetime access</p>

                        <ul className="text-gray-700 space-y-3 text-center mb-10">
                            <li>✔ Access to all pain points</li>
                            <li>✔ Download data as csv</li>
                            <li>✔ Advanced search & analytics</li>
                            <li>✔ Priority email support</li>
                        </ul>

                        <Link
                            href={
                                session?.user
                                    ? process.env.STRIPE_SHOP_PRO_LINK || ""
                                    : "/signup?callbackUrl=" + process.env.STRIPE_SHOP_PRO_LINK
                            }
                            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:brightness-110 transition"
                        >
                            Get Pro
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
