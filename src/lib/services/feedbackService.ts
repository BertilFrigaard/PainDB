import { pool } from "../utils/database";

export async function addFeedback(userId: number, feedback: string) {
    await pool.query("INSERT INTO feedback (user_id, feedback) VALUES ($1, $2)", [userId, feedback]);
}
