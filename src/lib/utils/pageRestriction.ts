import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function restrictPage(
    role: string = "none",
    missingRole: string = "/home",
    missingLogin: string = "/signup",
    invert: boolean = false
) {
    const session = await auth();

    if ((!session && !invert) || (session && invert)) {
        redirect(missingLogin);
    }

    const getRoleLevel = (role: string) => {
        if (role === "admin") {
            return 4;
        } else if (role === "unlimited") {
            return 3;
        } else if (role === "pro") {
            return 2;
        } else if (role === "starter") {
            return 1;
        } else {
            return 0;
        }
    };

    const roleLevel = getRoleLevel(session?.user.role ? session.user.role : "none");
    const neededRoleLevel = getRoleLevel(role);
    if (roleLevel >= neededRoleLevel && !invert) {
        return;
    }

    if (roleLevel <= neededRoleLevel && invert) {
        return;
    }
    redirect(missingRole);
}
