import { auth } from "@/auth";
import { disableFavorite } from "@/lib/services/favoriteService";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();
    const searchParams = req.nextUrl.searchParams;

    const dataPointParam = searchParams.get("data-point-id");

    if (!dataPointParam) {
        return Response.error();
    }

    await disableFavorite(Number(session?.user.id), dataPointParam);
    return Response.json({ status: "success" });
}
