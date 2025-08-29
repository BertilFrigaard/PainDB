import { pageMaxRole } from "@/lib/utils/roleRestrictions";

export default async function VerifyEmail() {
    await pageMaxRole({ role: "guest" });
    return (
        <main className="h-[80vh] flex flex-col items-center justify-center p-10 text-center bg-white text-gray-800">
            <div className="max-w-lg">
                <h2 className="text-3xl font-bold mt-4 mb-6">Check your email</h2>
                <p className="text-gray-600 mb-8">
                    We have sent a link to your email, please click the link to complete the sign in process.
                </p>
            </div>
        </main>
    );
}
