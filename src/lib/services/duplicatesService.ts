import { DuplicateLink } from "@/types/DuplicateLink";
import { pool } from "../utils/database";

export async function getDuplicateLinks(limit: number) {
    const res = await pool.query<DuplicateLink>(
        `SELECT 
  l.id,
  l.data_point_id_1,
  l.data_point_id_2,
  dp1.problem AS problem_1,
  dp2.problem AS problem_2,
  l.similarity
FROM data_point_links l
JOIN data_points dp1 ON dp1.id = l.data_point_id_1
JOIN data_points dp2 ON dp2.id = l.data_point_id_2
ORDER BY l.similarity DESC
LIMIT $1`,
        [limit]
    );
    return Response.json(res.rows);
}

export async function verifyDuplicateLink(link: DuplicateLink) {
    dismissDuplicateLink(link);
    const res = await pool.query("SELECT group_id, data_point_id FROM duplicates WHERE data_point_id IN ($1, $2)", [
        link.data_point_id_1,
        link.data_point_id_2,
    ]);
    if (res.rowCount) {
        if (res.rows[0]["data_point_id"] === link.data_point_id_1) {
            await pool.query("INSERT INTO duplicates (group_id, data_point_id) VALUES ($1, $2)", [
                res.rows[0]["group_id"],
                link.data_point_id_2,
            ]);
            return;
        } else if (res.rows[0]["data_point_id"] === link.data_point_id_2) {
            await pool.query("INSERT INTO duplicates (group_id, data_point_id) VALUES ($1, $2)", [
                res.rows[0]["group_id"],
                link.data_point_id_1,
            ]);
            return;
        }
    }
    const res2 = await pool.query("INSERT INTO duplicate_groups DEFAULT VALUES RETURNING id");
    await pool.query("INSERT INTO duplicates (group_id, data_point_id) VALUES ($1, $2)", [
        res2.rows[0]["id"],
        link.data_point_id_1,
    ]);
    await pool.query("INSERT INTO duplicates (group_id, data_point_id) VALUES ($1, $2)", [
        res2.rows[0]["id"],
        link.data_point_id_2,
    ]);
}

export async function dismissDuplicateLink(link: DuplicateLink) {
    await pool.query("DELETE FROM data_point_links WHERE id = $1", [link.id]);
}
