import { auth } from "@/auth";
import { getPainPointById } from "@/lib/services/dataService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { PainPoint } from "@/types/painpoint/PainPoint";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    const rr = await apiMinRole({ session: session });
    if (rr) {
        return rr;
    }

    const userID = Number(session?.user.id);
    if (isNaN(userID)) {
        return new Response(null, { status: 500 });
    }

    let res: PainPoint | null;
    try {
        res = await getPainPointById((await params).id, userID);
    } catch {
        return new Response(null, { status: 400 });
    }

    if (!res) {
        return new Response(null, { status: 404 });
    }
    return Response.json(res);
}
