import { auth } from "@/auth";
import { getPipelineWithLastRunByID } from "@/lib/services/pipelineService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { PipelineWithLastRun } from "@/types/pipeline/PipelineWithLastRun";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await auth();
    const rr = await apiMinRole({ role: "admin", session: session });
    if (rr) {
        return rr;
    }

    let res: PipelineWithLastRun | null;
    try {
        res = await getPipelineWithLastRunByID((await params).id);
    } catch {
        return new Response(null, { status: 400 });
    }

    if (!res) {
        return new Response(null, { status: 404 });
    }
    return Response.json(res);
}
