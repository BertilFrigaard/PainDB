import { NextRequest } from "next/server";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { auth } from "@/auth";
import { addFeedback, getFeedback } from "@/lib/services/feedbackService";

export async function POST(req: NextRequest) {
    const session = await auth();
    const rr = await apiMinRole({ role: "standard", session: session });
    if (rr) {
        return rr;
    }
    try {
        const body = await req.json();
        if (!body || typeof body.feedback !== "string") {
            return new Response(null, { status: 400 });
        }

        const userID = Number(session?.user.id);
        if (isNaN(userID)) {
            return new Response(null, { status: 400 });
        }

        await addFeedback(userID, body.feedback as string);

        return new Response(null, { status: 204 });
    } catch {
        return new Response(null, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const session = await auth();
    const rr = await apiMinRole({ role: "admin", session: session });
    if (rr) {
        return rr;
    }

    const searchParams = req.nextUrl.searchParams;

    const pageSizeParam = searchParams.get("page-size");
    const pageIndexParam = searchParams.get("page-index");

    const pageSize = Number(pageSizeParam);
    const pageIndex = Number(pageIndexParam);

    if (isNaN(pageSize) || isNaN(pageIndex)) {
        return new Response(null, { status: 400 });
    }

    try {
        return Response.json(await getFeedback(10, 0));
    } catch {
        return new Response(null, { status: 500 });
    }
}
