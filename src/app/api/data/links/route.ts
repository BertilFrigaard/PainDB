import { getDuplicateLinks } from "@/lib/services/duplicatesService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const rr = await apiMinRole({ role: "admin" });
    if (rr) {
        return rr;
    }

    const searchParams = req.nextUrl.searchParams;

    const limitParam = searchParams.get("limit");

    const limit = Number(limitParam);

    if (isNaN(limit)) {
        return new Response(null, { status: 400 });
    }

    if (limit <= 0) {
        return new Response(null, { status: 400 });
    }

    try {
        return Response.json(await getDuplicateLinks(limit));
    } catch {
        return new Response(null, { status: 500 });
    }
}
