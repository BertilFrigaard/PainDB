import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleContinueButton({ redirectTo }: { redirectTo: string }) {
    if (!process.env.NEXT_PUBLIC_BACKEND_GOOGLE_URL) {
        throw new Error("Missing environment varibles");
    }
    const signInWithGoogle = () => {
        signIn("google", { redirectTo: redirectTo });
    };
    return (
        <button
            onClick={signInWithGoogle}
            className="w-full border border-gray-300 rounded-xl px-7 py-3 flex justify-center items-center animating-button hover:bg-gray-200"
        >
            <FcGoogle size={22} />
            <span className="text-sm font-medium text-gray-700 ml-2">Continue with Google</span>
        </button>
    );
}
