import { NextRequest } from "next/server";
import { DuplicateLink } from "@/types/DuplicateLink";
import { dismissDuplicateLink } from "@/lib/services/duplicatesService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";

export async function POST(req: NextRequest) {
    const rr = apiMinRole({ role: "admin" });
    if (rr) {
        return rr;
    }
    try {
        const body = await req.json();
        if (
            !body ||
            typeof body.id !== "number" ||
            typeof body.data_point_id_1 !== "string" ||
            typeof body.data_point_id_2 !== "string" ||
            typeof body.problem_1 !== "string" ||
            typeof body.problem_2 !== "string" ||
            typeof body.similarity !== "number"
        ) {
            return new Response(null, { status: 400 });
        }

        const duplicateLink: DuplicateLink = body;

        dismissDuplicateLink(duplicateLink);

        return new Response(null, { status: 204 });
    } catch {
        return new Response(null, { status: 400 });
    }
}
