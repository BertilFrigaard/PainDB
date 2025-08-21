import { NextRequest } from "next/server";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { auth } from "@/auth";
import { addFeedback } from "@/lib/services/feedbackService";

export async function POST(req: NextRequest) {
    const session = await auth();
    const rr = await apiMinRole({ role: "none", session: session });
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
