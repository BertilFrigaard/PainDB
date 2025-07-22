import { auth } from "@/auth";
import { getPainPointById } from "@/lib/services/dataService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    return Response.json(await (await getPainPointById((await params).id, Number(session?.user.id))).json());
}
