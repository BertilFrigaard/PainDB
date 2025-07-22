import { pool } from "../utils/database";

export async function enableFavorite(userID: number, dataPointID: string) {
    await pool.query(
        `INSERT INTO favorites (user_id, data_point_id)
   VALUES ($1, $2)
   ON CONFLICT DO NOTHING`,
        [userID, dataPointID]
    );
}

export async function disableFavorite(userID: number, dataPointID: string) {
    await pool.query(
        `DELETE FROM favorites
   WHERE user_id = $1 AND data_point_id = $2
   RETURNING *`,
        [userID, dataPointID]
    );
}
