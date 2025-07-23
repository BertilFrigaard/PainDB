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

    let limit: number;

    try {
        limit = Number(limitParam);
    } catch {
        return Response.error();
    }

    if (limit <= 0) {
        return Response.error();
    }

    return Response.json(await (await getDuplicateLinks(limit)).json());
}
