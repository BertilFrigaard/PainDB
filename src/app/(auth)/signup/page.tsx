import SignupSection from "@/components/sections/SignupSection";
import { pageMaxRole } from "@/lib/utils/roleRestrictions";

export default async function SignUp() {
    await pageMaxRole({ role: "guest" });
    return <SignupSection />;
}
