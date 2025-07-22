import { getDuplicateLinks } from "@/lib/services/duplicatesService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
