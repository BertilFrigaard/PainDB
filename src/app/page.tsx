import Image from "next/image";
import Link from "next/link";

export default async function Landing() {
    return (
        <main>
            <section className="px-10 py-20 bg-background min-h-[90vh] ">
                <div className="px-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl space-y-12">
                        <div className="space-y-5">
                            <h1 className="text-5xl font-bold leading-tight">
                                Build with confidence <br /> Skip the guesswork
                            </h1>
                            <p className="text-xl text-secondary">
                                Access thousands of real-world pain points to validate your next idea before writing a
                                single line of code.
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <Link className="px-8 py-4 rounded-2xl bg-primary text-white" href={"/signup"}>
                                Get Started
                            </Link>
                            <Link className="px-8 py-4 rounded-2xl border-1 border-gray-500 text-black" href={""}>
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <Image
                            src="/images/showcase_landing.png"
                            alt="Showcase Landing"
                            width={400}
                            height={400}
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
