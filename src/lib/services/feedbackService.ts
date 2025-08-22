import { Feedback } from "@/types/Feedback";
import { pool } from "../utils/database";

export async function addFeedback(userId: number, feedback: string) {
    await pool.query("INSERT INTO feedback (user_id, feedback) VALUES ($1, $2)", [userId, feedback]);
}

export async function getFeedback(pageSize: number, pageIndex: number) {
    const res = await pool.query<Feedback>("SELECT * FROM feedback LIMIT $1 OFFSET $2", [
        pageSize,
        pageSize * pageIndex,
    ]);
    return res.rows;
}
