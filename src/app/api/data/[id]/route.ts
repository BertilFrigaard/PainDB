import { auth } from "@/auth";
import { getPainPointById } from "@/lib/services/dataService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    const rr = await apiMinRole({ session: session });
    if (rr) {
        return rr;
    }

    let userID;
    try {
        userID = Number(session?.user.id);
    } catch {
        return new Response(null, { status: 500 });
    }

    const res = await getPainPointById((await params).id, userID);
    if (!res) {
        return new Response(null, { status: 404 });
    }
    return Response.json(res);
}
