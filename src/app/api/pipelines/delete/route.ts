import { NextRequest } from "next/server";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { deletePipeline } from "@/lib/services/pipelineService";

export async function POST(req: NextRequest) {
    const rr = await apiMinRole({ role: "admin" });
    if (rr) {
        return rr;
    }

    const body = await req.json();
    if (!body || typeof body.id !== "string") {
        return new Response(null, { status: 400 });
    }

    try {
        await deletePipeline(body.id);
        return new Response(null, { status: 204 });
    } catch (e) {
        console.log(e);
        return new Response(null, { status: 500 });
    }
}
