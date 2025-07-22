import { auth } from "@/auth";
import {
    getLeastRecentPainPoints,
    getLeastValidatedPainPoints,
    getMostRecentPainPoints,
    getMostValidatedPainPoints,
} from "@/lib/services/dataService";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth();

    const searchParams = req.nextUrl.searchParams;

    const pageSizeParam = searchParams.get("page-size");
    const pageIndexParam = searchParams.get("page-index");
    const orderParam = searchParams.get("order");

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

    if (orderParam === "most_recent") {
        return Response.json(
            await (await getMostRecentPainPoints(pageSize, pageIndex, Number(session?.user.id))).json()
        );
    } else if (orderParam === "least_recent") {
        return Response.json(
            await (await getLeastRecentPainPoints(pageSize, pageIndex, Number(session?.user.id))).json()
        );
    } else if (orderParam === "most_validation") {
        return Response.json(
            await (await getMostValidatedPainPoints(pageSize, pageIndex, Number(session?.user.id))).json()
        );
    } else if (orderParam === "least_validation") {
        return Response.json(
            await (await getLeastValidatedPainPoints(pageSize, pageIndex, Number(session?.user.id))).json()
        );
    } else {
        return Response.error();
    }
}
