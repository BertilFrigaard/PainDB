import { NextRequest } from "next/server";
import { apiMinRole } from "@/lib/utils/roleRestrictions";
import { startPipelineScript } from "@/lib/services/scriptService";
import {
    createPipelineRun,
    deletePipelineRun,
    deletePipelineRunData,
    getPipelineLastRun,
    getPipelinesLastRunStarted,
} from "@/lib/services/pipelineService";
import { auth } from "@/auth";
import { toUnixTimestamp } from "@/lib/utils/timestamps";

export async function POST(req: NextRequest) {
    const session = await auth();
    const rr = await apiMinRole({ role: "admin", session: session });
    if (rr) {
        return rr;
    }

    const body = await req.json();
    if (!body || typeof body.id !== "string") {
        return new Response(null, { status: 400 });
    }

    try {
        const userID = Number(session?.user.id);
        if (isNaN(userID)) {
            return new Response(null, { status: 400 });
        }

        const lastRun = await getPipelineLastRun(body.id);

        if (!lastRun) {
            return new Response(null, { status: 500 });
        }

        await deletePipelineRunData(lastRun);
        await deletePipelineRun(lastRun);

        const lastRunStarted = await getPipelinesLastRunStarted(body.id);

        if (!lastRunStarted) {
            return new Response(null, { status: 404 });
        }

        const timestamp = toUnixTimestamp(new Date(lastRunStarted || Date.now()));

        const pipelineRunID = await createPipelineRun(userID, body.id);

        if (!pipelineRunID) {
            return new Response(null, { status: 500 });
        }

        await startPipelineScript(body.id, pipelineRunID, timestamp);
        return new Response(null, { status: 204 });
    } catch (e) {
        console.log(e);
        return new Response(null, { status: 500 });
    }
}
