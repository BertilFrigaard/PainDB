export default function PRIVACY() {
    return (
        <main className="mx-auto py-10 px-5 space-y-10 max-w-7xl mb-20">
            <div>
                <h1 className="font-bold text-4xl mb-2">Privacy Policy</h1>
                <p className="font-light text-xl text-secondary">Last update [8/23 2025]</p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Overview</h2>
                <p className="py-2">
                    This Privacy Policy explains how we (paindb.com) collect, use, and protect your information when you
                    use our site. We comply with applicable data protection legislation, including the EU General Data
                    Protection Regulation (GDPR), the Danish Data Protection Act, and the rules on cookies in the Danish
                    Cookie Executive Order.
                </p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Data Controller</h2>
                <p className="py-2">Our data controller is:</p>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Bertil Frigaard</li>
                    <li>Email: app.paindb@gmail.com</li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">What information do we collect?</h2>
                <p className="py-2">
                    We only collect the information necessary to provide and improve the service. This may include:
                </p>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Account information: username, email address.</li>
                    <li>
                        If you sign in via Google, we receive your name, email address, and profile picture from Google.
                    </li>
                    <li>
                        Payment data: billing details such as name, email address, and payment method (handled directly
                        by Stripe).
                    </li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Purposes and Legal bases</h2>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Service delivery (login, functionality, support) → contract (GDPR Art. 6(1)(b)).</li>
                    <li>Authentication (via Auth.js and Google) → consent (Art. 6(1)(a)).</li>
                    <li>
                        Payments (via Stripe) → contract (Art. 6(1)(b)) and legal obligation for accounting (Art.
                        6(1)(c)).
                    </li>
                    <li>Security and abuse prevention (including server logs) → legitimate interest (Art. 6(1)(f)).</li>
                    <li>Analytics and improvements → consent via cookies (Art. 6(1)(a)).</li>
                    <li>Marketing communications (e.g., newsletters, notifications) → consent (Art. 6(1)(a)).</li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Third-party Services</h2>
                <p className="py-2">We rely on trusted service providers to deliver core functionality of the app:</p>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>
                        Hosting: The app runs on servers provided by Hetzner Online GmbH. Hetzner automatically collects
                        server logs (including IP addresses, request details, and browser information) for security,
                        stability, and abuse prevention. See Hetzner’s{" "}
                        <a className="underline" href="https://www.hetzner.com/legal/privacy-policy">
                            Privacy Policy
                        </a>
                        .
                    </li>
                    <li>
                        Payments: Payments are processed securely by Stripe. Stripe may collect payment and billing
                        details directly from you in accordance with their{" "}
                        <a className="underline" href="https://stripe.com/en-dk/privacy">
                            Privacy Policy
                        </a>
                        . We do not store card details on our servers.
                    </li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Server and Application logs</h2>
                <p className="py-2">When you use the app, certain technical information is logged automatically:</p>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>
                        Server logs (via Hetzner): IP address, request date and time, URL requested, browser type, and
                        operating system. These logs are used for security and system integrity and are automatically
                        deleted after a limited time unless needed to investigate abuse.
                    </li>
                    <li>
                        Application logs: We may record basic request details (e.g., URL paths, error messages) to
                        ensure reliable operation. We avoid logging personal data where possible, and logs are regularly
                        rotated and deleted.
                    </li>
                </ul>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Data Retention</h2>
                <p className="py-2">We do not keep personal data longer than necessary.</p>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Account data is stored until you delete your account or after a period of inactivity.</li>
                    <li>Payment records are retained by Stripe in accordance with legal obligations.</li>
                    <li>Server logs are retained by Hetzner for a short time for security purposes.</li>
                    <li>Application logs we control are deleted regularly.</li>
                </ul>
                <p className="py-2">
                    In all cases, data is only kept as long as required to provide the service, comply with legal
                    obligations, or resolve disputes.
                </p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Your Rights</h2>
                <p className="py-2">Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-5 mt-2 text-base space-y-3">
                    <li>Access the data we hold about you.</li>
                    <li>Correct inaccurate personal information.</li>
                    <li>Request deletion of your data.</li>
                    <li>Restrict or object to processing.</li>
                    <li>Receive your data in a portable format.</li>
                </ul>
                <p className="py-2">To exercise these rights, contact us at app.paindb@gmail.com</p>
                <p className="py-2">
                    You also have the right to complain to the{" "}
                    <a className="underline" href="https://www.datatilsynet.dk">
                        Danish Data Protection Authority
                    </a>
                    .
                </p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Cookies</h2>
                <p className="py-2">
                    This app uses cookies only to manage authentication and sessions through Auth.js. These cookies are
                    strictly necessary for the service to function (e.g., to keep you signed in). They do not track you
                    across other websites and are not used for marketing purposes. You can control or delete cookies
                    through your browser settings, but without them, certain features of the app (such as logging in)
                    may not work.
                </p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Security</h2>
                <p className="py-2">
                    We use appropriate technical and organizational measures to protect personal data against
                    unauthorized access, alteration, loss, or misuse.
                </p>
            </div>

            <div>
                <h2 className="font-bold text-2xl">Updates</h2>
                <p className="py-2">
                    This Privacy Policy may be updated from time to time. The latest version will always be available on
                    this page. If major changes are made, we will notify users through the app or by email.
                </p>
            </div>
        </main>
    );
}
