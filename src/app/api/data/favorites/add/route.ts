import { auth } from "@/auth";
import { enableFavorite } from "@/lib/services/favoriteService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();
    const rr = await apiMinRole({ session: session });
    if (rr) {
        return rr;
    }

    const searchParams = req.nextUrl.searchParams;

    const dataPointParam = searchParams.get("data-point-id");

    if (!dataPointParam) {
        return Response.error();
    }

    await enableFavorite(Number(session?.user.id), dataPointParam);
    return new Response(null, { status: 204 });
}
