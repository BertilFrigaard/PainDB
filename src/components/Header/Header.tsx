import Link from "next/link";

export default function Header() {
    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-background">
            <div className="flex items-center space-x-20">
                <Link className="text-3xl font-bold text-secondary" href="/">
                    PainDB
                </Link>
                <div className="flex space-x-8">
                    <Link className="text-secondary" href="">
                        Features
                    </Link>
                    <Link className="text-secondary" href="">
                        Example
                    </Link>
                    <Link className="text-secondary" href="">
                        FAQ
                    </Link>
                    <Link className="text-secondary" href="">
                        Pricing
                    </Link>
                </div>
            </div>
            <div className="flex space-x-4">
                <Link className="px-7 py-3 border border-gray-500 rounded-2xl" href="/login">
                    Login
                </Link>
                <Link className="px-7 py-3 rounded-2xl bg-primary text-white" href="/signup">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}
