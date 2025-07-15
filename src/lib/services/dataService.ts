import { pool } from "../utils/database";

export async function getPainPoints(limit: number) {
    const res = await pool.query("SELECT * FROM data_points LIMIT %s", [limit]);
    return res;
}
