import { auth } from "@/auth";
import { getLogsByPipelineRunID } from "@/lib/services/pipelineService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    const rr = await apiMinRole({ role: "admin", session: session });
    if (rr) {
        return rr;
    }

    try {
        const logs = await getLogsByPipelineRunID((await params).id);
        return Response.json(logs);
    } catch {
        return new Response(null, { status: 500 });
    }
}
