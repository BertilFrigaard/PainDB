import { auth } from "@/auth";
import { createPipeline, createPipelineRun } from "@/lib/services/pipelineService";
import { startPipelineScript } from "@/lib/services/scriptService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";

function getRollbackUnixTimestamp(days: number) {
    const now = new Date();
    const rollbackDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return Math.floor(rollbackDate.getTime() / 1000);
}

export async function POST(req: Request) {
    const session = await auth();
    const rr = await apiMinRole({ role: "admin", session: session });
    if (rr) {
        return rr;
    }

    const body = await req.json();

    if (typeof body.sub_reddit !== "string" || typeof body.from !== "number") {
        return new Response(null, { status: 400 });
    }

    if (body.from < getRollbackUnixTimestamp(60)) {
        return new Response(null, { status: 400 });
    }

    const userID = Number(session?.user.id);
    if (isNaN(userID)) {
        return new Response(null, { status: 500 });
    }

    const pipelineID = await createPipeline(userID, body.sub_reddit);

    if (!pipelineID) {
        return new Response(null, { status: 500 });
    }

    const pipelineRunID = await createPipelineRun(userID, pipelineID);

    if (!pipelineRunID) {
        return new Response(null, { status: 500 });
    }

    try {
        await startPipelineScript(pipelineID, pipelineRunID, body.from);
    } catch {
        return new Response(null, { status: 500 });
    }

    return new Response(null, { status: 204 });
}
