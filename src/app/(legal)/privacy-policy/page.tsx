export default function PRIVACY() {
    return (
        <main className="mx-auto py-10 space-y-10 max-w-7xl mb-20">
            <div>
                <h1 className="font-bold text-4xl mb-2">Privacy Policy</h1>
                <p className="font-light text-xl text-secondary">Last update [8/18 2025]</p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Overview</h2>
                <p>
                    This website (“Service”) allows registered users to search through and download data from a curated
                    database derived from Reddit scraping and AI processing. The Service is operated in Denmark
                    (Sjælland). By registering or using the Service, you agree to these Terms of Service.
                </p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Accounts and Access</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>
                        You must register an account (email and name required) to access or download database contents.
                    </li>
                    <li>
                        Free accounts exist but offer no features; full access requires a one-time payment processed via
                        Stripe.
                    </li>
                    <li>
                        You are responsible for all activities under your account and must keep your login credentials
                        secure.
                    </li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Use of the Service</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>
                        Do not misuse the Service (e.g., no scraping, reverse engineering, or violating applicable
                        laws).
                    </li>
                    <li>You may not redistribute or resell the database content unless explicitly permitted.</li>
                    <li>
                        The Service is provided “as is.” Content may contain inaccuracies, and the operator makes no
                        warranties regarding completeness or reliability.
                    </li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Payment and Refunds</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Payments are one-time charges processed by Stripe.</li>
                    <li>Except where mandated by law, payments are non-refundable.</li>
                    <li>Stripe’s terms and privacy policy govern payment processing.</li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Termination</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>
                        The operator may suspend or terminate your account for any reason, including breach of these
                        Terms.
                    </li>
                    <li>You may delete your account at any time by contacting bertilfrigaard@gmail.com.</li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Limitation of Liability</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>To the extent permitted by Danish law, the Service is provided without warranties.</li>
                    <li>
                        The operator is not liable for indirect or consequential damages, data loss, or loss of profits
                        arising from use of the Service.
                    </li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Changes</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Terms may be updated from time to time; continued use after updates constitutes acceptance.</li>
                    <li>Significant changes will be notified via email or through the Service.</li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Contact</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>For questions regarding these Terms, contact: bertilfrigaard@gmail.com</li>
                </ul>
            </div>
        </main>
    );
}
