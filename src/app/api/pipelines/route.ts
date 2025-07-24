import { getPipelinesWithLastRun } from "@/lib/services/pipelineService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";

export async function GET() {
    const rr = await apiMinRole({ role: "admin" });
    if (rr) {
        return rr;
    }

    try {
        const pipelines = await getPipelinesWithLastRun();
        return Response.json(pipelines);
    } catch {
        return new Response(null, { status: 500 });
    }
}
