import { NextRequest, NextResponse } from "next/server";
import { DuplicateLink } from "@/types/DuplicateLink";
import { dismissDuplicateLink } from "@/lib/services/duplicatesService";

export async function POST(req: NextRequest) {
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
            return NextResponse.json({ error: "Invalid DuplicateLink payload" }, { status: 400 });
        }

        const duplicateLink: DuplicateLink = body;

        dismissDuplicateLink(duplicateLink);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
