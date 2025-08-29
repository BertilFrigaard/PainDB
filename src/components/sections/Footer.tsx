import Link from "next/link";

export default async function Footer() {
    return (
        <footer className="bg-gray-100 py-12 border-gray-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Logo */}
                <div className="mb-8 md:mb-0">
                    <span className="text-secondary font-bold text-2xl">PainDB</span>
                </div>
                {/* Links Columns */}
                <div className="flex flex-col sm:flex-row gap-12 flex-1 justify-center">
                    <div>
                        <h4 className="font-semibold text-secondary mb-3">Solutions</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>
                                <Link href="/#the-problem" className="hover:text-primary transition">
                                    The Problem
                                </Link>
                            </li>
                            <li>
                                <Link href="/#what-we-do" className="hover:text-primary transition">
                                    What we do
                                </Link>
                            </li>
                            <li>
                                <Link href="/examples" className="hover:text-primary transition">
                                    Examples
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-3">Company</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>
                                <Link href="https://bertilfrigaard.dk" className="hover:text-primary transition">
                                    The Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-3">Legal</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>
                                <Link href="/terms-of-service" className="hover:text-primary transition">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-primary transition">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Social */}
                {/*                 <div className="flex flex-col items-start gap-4">
                    <span className="text-secondary font-semibold">Follow us on</span>
                    <div className="flex gap-4 text-xl text-gray-600">
                        <Link href="#" aria-label="Twitter" className="hover:text-primary">
                            <FaTwitter />
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="hover:text-primary">
                            <FaLinkedin />
                        </Link>
                        <Link href="#" aria-label="Facebook" className="hover:text-primary">
                            <FaFacebook />
                        </Link>
                    </div>
                </div> */}
            </div>
            <div className="border-t-2 border-gray-300 mt-10 pt-6 text-center text-gray-500 text-sm mx-20">
                &copy; {new Date().getFullYear()} PainDB. All Rights Reserved.
            </div>
        </footer>
    );
}
