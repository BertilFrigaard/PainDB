import updateValidationScores from "@/lib/services/validationScoreService";
import { apiMinRole } from "@/lib/utils/roleRestrictions";

export async function POST() {
    const rr = await apiMinRole({ role: "admin" });
    if (rr) {
        return rr;
    }

    try {
        await updateValidationScores();
        return new Response(null, { status: 204 });
    } catch {
        return new Response(null, { status: 500 });
    }
}
