import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

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
                                <a href="#" className="hover:text-primary transition">
                                    Startups
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Freelancers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Teams
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Market Research
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-3">Company</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-3">Learn</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition">
                                    Templates
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Social */}
                <div className="flex flex-col items-start gap-4">
                    <span className="text-secondary font-semibold">Follow us on</span>
                    <div className="flex gap-4 text-xl text-gray-600">
                        <a href="#" aria-label="Twitter" className="hover:text-primary">
                            <FaTwitter />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-primary">
                            <FaLinkedin />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-primary">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t-2 border-gray-300 mt-10 pt-6 text-center text-gray-500 text-sm mx-20">
                &copy; {new Date().getFullYear()} PainDB. All Rights Reserved.
            </div>
        </footer>
    );
}
