import { getPainPointById } from "@/lib/services/dataService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    return Response.json(await (await getPainPointById((await params).id)).json());
}
