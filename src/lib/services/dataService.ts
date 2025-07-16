import { PainPoint } from "@/types/PainPoint";
import { pool } from "../utils/database";

export async function getPainPoints(pageSize: number, pageIndex: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
      dp.id,
      dp.problem,
      dp.description,
      dp.created,
      COALESCE(m.validation) AS validation,
      COALESCE(array_agg(DISTINCT d2.data_point_id) 
               FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates
    FROM data_points dp
    LEFT JOIN metadata m ON dp.id = m.data_point_id
    LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
    LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
    GROUP BY dp.id, dp.problem, dp.description, dp.created, m.validation
    LIMIT $1 OFFSET $2
    `,
        [pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}

export async function searchPainPoints(query: string, pageSize: number, pageIndex: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
      dp.id,
      dp.problem,
      dp.description,
      dp.created,
      COALESCE(m.validation) AS validation,
      COALESCE(array_agg(DISTINCT d2.data_point_id) 
               FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates
    FROM data_points dp
    LEFT JOIN metadata m ON dp.id = m.data_point_id
    LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
    LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
    WHERE dp.problem ILIKE $1
    GROUP BY dp.id, dp.problem, dp.description, dp.created, m.validation
    LIMIT $2 OFFSET $3
    `,
        [`%${query}%`, pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}
