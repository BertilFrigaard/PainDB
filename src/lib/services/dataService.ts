import { PainPoint } from "@/types/PainPoint";
import { pool } from "../utils/database";

export async function getMostRecentPainPoints(pageSize: number, pageIndex: number, userID: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
            dp.id,
            dp.problem,
            dp.description,
            dp.created,
            m.validation,
            COALESCE(array_agg(DISTINCT d2.data_point_id)
                FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
        (f.user_id IS NOT NULL) AS favorite
        FROM data_points dp
        LEFT JOIN metadata m ON dp.id = m.data_point_id
        LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
        LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
        LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
        GROUP BY dp.id, m.validation, f.user_id
        ORDER BY dp.created DESC
        LIMIT $2 OFFSET $3
        `,
        [userID, pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}

export async function getLeastRecentPainPoints(pageSize: number, pageIndex: number, userID: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
            dp.id,
            dp.problem,
            dp.description,
            dp.created,
            m.validation,
            COALESCE(array_agg(DISTINCT d2.data_point_id)
                FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
        (f.user_id IS NOT NULL) AS favorite
        FROM data_points dp
        LEFT JOIN metadata m ON dp.id = m.data_point_id
        LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
        LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
        LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
        GROUP BY dp.id, m.validation, f.user_id
        ORDER BY dp.created ASC
        LIMIT $2 OFFSET $3
        `,
        [userID, pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}

export async function getMostValidatedPainPoints(pageSize: number, pageIndex: number, userID: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
            dp.id,
            dp.problem,
            dp.description,
            dp.created,
            m.validation,
            COALESCE(array_agg(DISTINCT d2.data_point_id)
                FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
        (f.user_id IS NOT NULL) AS favorite
        FROM data_points dp
        LEFT JOIN metadata m ON dp.id = m.data_point_id
        LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
        LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
        LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
        GROUP BY dp.id, m.validation, f.user_id
        ORDER BY m.validation DESC NULLS LAST
        LIMIT $2 OFFSET $3
        `,
        [userID, pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}

export async function getLeastValidatedPainPoints(pageSize: number, pageIndex: number, userID: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
            dp.id,
            dp.problem,
            dp.description,
            dp.created,
            m.validation,
            COALESCE(array_agg(DISTINCT d2.data_point_id)
                FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
        (f.user_id IS NOT NULL) AS favorite
        FROM data_points dp
        LEFT JOIN metadata m ON dp.id = m.data_point_id
        LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
        LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
        LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
        GROUP BY dp.id, m.validation, f.user_id
        ORDER BY m.validation ASC NULLS LAST
        LIMIT $2 OFFSET $3
        `,
        [userID, pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}

export async function searchPainPoints(query: string, pageSize: number, pageIndex: number, userID: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
      dp.id,
      dp.problem,
      dp.description,
      dp.created,
      COALESCE(m.validation) AS validation,
      COALESCE(array_agg(DISTINCT d2.data_point_id) 
               FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
        (f.user_id IS NOT NULL) AS favorite
    FROM data_points dp
    LEFT JOIN metadata m ON dp.id = m.data_point_id
    LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
    LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
        LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
    WHERE dp.problem ILIKE $2
    GROUP BY dp.id, dp.problem, dp.description, dp.created, m.validation, f.user_id
    LIMIT $3 OFFSET $4
    `,
        [userID, `%${query}%`, pageSize, pageIndex * pageSize]
    );
    return Response.json(res.rows);
}

export async function getPainPointById(id: string, userID: number) {
    const res = await pool.query<PainPoint>(
        `SELECT 
      dp.id,
      dp.problem,
      dp.description,
      dp.created,
      COALESCE(m.validation) AS validation,
      COALESCE(array_agg(DISTINCT d2.data_point_id) 
               FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
        (f.user_id IS NOT NULL) AS favorite
    FROM data_points dp
    LEFT JOIN metadata m ON dp.id = m.data_point_id
    LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
    LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
        LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
    WHERE dp.id = $2
    GROUP BY dp.id, dp.problem, dp.description, dp.created, m.validation, f.user_id
    LIMIT 1
    `,
        [userID, id]
    );
    if (res.rows.length === 1) {
        return Response.json(res.rows[0]);
    } else {
        return Response.error();
    }
}
