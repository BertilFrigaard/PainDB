import { searchPainPoints } from "@/lib/services/dataService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const searchQuery = searchParams.get("search-query");

    if (!searchQuery) {
        return Response.error();
    }

    const pageSizeParam = searchParams.get("page-size");
    const pageIndexParam = searchParams.get("page-index");

    let pageSize: number;
    let pageIndex: number;

    try {
        pageSize = Number(pageSizeParam);
        pageIndex = Number(pageIndexParam);
    } catch {
        return Response.error();
    }

    if (pageSize <= 0 || pageIndex < 0) {
        return Response.error();
    }
    return Response.json(await (await searchPainPoints(searchQuery, pageSize, pageIndex)).json());
}
