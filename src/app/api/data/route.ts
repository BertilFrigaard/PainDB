import { auth } from "@/auth";
import { getPainPoints } from "@/lib/services/dataService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { OrderOptions } from "@/types/OrderOptions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth();
    const rr = await apiMinRole({ session: session });
    if (rr) {
        return rr;
    }

    const searchParams = req.nextUrl.searchParams;

    const pageSizeParam = searchParams.get("page-size");
    const pageIndexParam = searchParams.get("page-index");
    const orderParam = searchParams.get("order");
    const filterParam = searchParams.get("filter");
    const searchParam = searchParams.get("search");

    const filterForFavorites = filterParam === "favorites";

    const pageSize = Number(pageSizeParam);
    const pageIndex = Number(pageIndexParam);

    if (isNaN(pageSize) || isNaN(pageIndex)) {
        return new Response(null, { status: 400 });
    }

    if (pageSize <= 0 || pageIndex < 0) {
        return new Response(null, { status: 400 });
    }

    const userID = Number(session?.user.id);
    if (isNaN(userID)) {
        return new Response(null, { status: 500 });
    }

    return Response.json(
        await getPainPoints({
            pageSize,
            pageIndex,
            userID,
            filterFavorites: filterForFavorites,
            ...(searchParam && { searchQuery: searchParam }),
            ...(["most_recent", "least_recent", "most_validation", "least_validation"].includes(
                orderParam ? orderParam : ""
            ) && { orderBy: orderParam as OrderOptions }),
        })
    );
}
