import updateValidationScores from "@/lib/services/validationScoreService";

export async function POST() {
    await updateValidationScores();
    return Response.json({ success: "true" });
}
