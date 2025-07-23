import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

function getRoleLevel(role: string) {
    if (role === "admin") {
        return 5;
    } else if (role === "unlimited") {
        return 4;
    } else if (role === "pro") {
        return 3;
    } else if (role === "starter") {
        return 2;
    } else if (role === "none") {
        return 1;
    } else {
        return 0;
    }
}

export async function apiMinRole({ role = "starter", session = null }: { role?: string; session?: Session | null }) {
    if (!session) {
        session = await auth();
    }

    const userRole = getRoleLevel(session?.user.role || "");
    const minRole = getRoleLevel(role);

    if (minRole > userRole) {
        if (session) {
            return new Response(null, { status: 403 });
        } else {
            return new Response(null, { status: 401 });
        }
    }
    return null;
}

export async function pageMaxRole({
    role = "none",
    redirectUsers = "/home",
    redirectVisitors = "/signup",
    session = null,
}: {
    role?: string;
    redirectUsers?: string;
    redirectVisitors?: string;
    session?: Session | null;
}) {
    if (!session) {
        session = await auth();
    }

    const userRole = getRoleLevel(session?.user.role || "");
    const maxRole = getRoleLevel(role);

    if (maxRole < userRole) {
        if (session) {
            redirect(redirectUsers);
        } else {
            redirect(redirectVisitors);
        }
    }
}

export async function pageMinRole({
    role = "starter",
    redirectUsers = "/",
    redirectVisitors = "/signup",
    session = null,
}: {
    role?: string;
    redirectUsers?: string;
    redirectVisitors?: string;
    session?: Session | null;
}) {
    if (!session) {
        session = await auth();
    }

    const userRole = getRoleLevel(session?.user.role || "");
    const minRole = getRoleLevel(role);

    if (minRole > userRole) {
        if (session) {
            redirect(redirectUsers);
        } else {
            redirect(redirectVisitors);
        }
    }
}
