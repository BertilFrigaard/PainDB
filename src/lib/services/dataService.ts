import { PainPoint } from "@/types/painpoint/PainPoint";
import { pool } from "../utils/database";
import { OrderOptions } from "@/types/OrderOptions";
import { BigPainPoint } from "@/types/painpoint/BigPainPoint";
import { ensureEnv } from "../utils/envEnsurer";

ensureEnv(["DATA_MIN_SIMILARITY"]);

export async function getPainPoints({
    pageSize,
    pageIndex,
    userID,
    filterFavorites = false,
    searchQuery = "",
    orderBy = "most_recent",
}: {
    pageSize: number;
    pageIndex: number;
    userID: number;
    filterFavorites?: boolean;
    searchQuery?: string;
    orderBy?: OrderOptions;
}) {
    const orderClause = {
        least_recent: "dp.created ASC",
        most_recent: "dp.created DESC",
        least_validation: "m.validation ASC NULLS LAST",
        most_validation: "m.validation DESC NULLS LAST",
    }[orderBy];

    const whereClause = searchQuery ? "WHERE dp.problem ILIKE $2" : "";

    const params: (string | number)[] = searchQuery
        ? [userID, `%${searchQuery}%`, pageSize, pageIndex * pageSize]
        : [userID, pageSize, pageIndex * pageSize];

    const res = await pool.query<PainPoint>(
        `
        SELECT 
            dp.id,
            dp.problem,
            dp.description,
            dp.created,
            m.validation,
            (f.user_id IS NOT NULL) AS favorite
        FROM data_points dp
        LEFT JOIN metadata m ON dp.id = m.data_point_id
        ${filterFavorites ? "INNER" : "LEFT"} JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
        ${whereClause}
        GROUP BY dp.id, m.validation, f.user_id
        ORDER BY ${orderClause}
        LIMIT $${params.length - 1} OFFSET $${params.length}
        `,
        params
    );

    return res.rows;
}

export async function getPainPointById(id: string, userID: number) {
    const minSimilarity = Number(process.env.DATA_MIN_SIMILARITY);
    if (isNaN(minSimilarity)) {
        return null;
    }
    const res = await pool.query<BigPainPoint>(
        `SELECT 
    dp.id,
    dp.problem,
    dp.description,
    dp.created,
    COALESCE(m.validation) AS validation,
    COALESCE(ARRAY_AGG(nn.data_point_id), '{}') AS similar,
    (f.user_id IS NOT NULL) AS favorite
  FROM data_points dp
  LEFT JOIN metadata m ON dp.id = m.data_point_id
  LEFT JOIN LATERAL (
    SELECT m2.data_point_id
    FROM metadata m2
    WHERE m2.data_point_id != dp.id
      AND 1 - (m.problem_embedding <=> m2.problem_embedding) >= $3
    ORDER BY m.problem_embedding <=> m2.problem_embedding
  ) AS nn ON true
  LEFT JOIN favorites f ON f.data_point_id = dp.id AND f.user_id = $1
  WHERE dp.id = $2
  GROUP BY dp.id, dp.problem, dp.description, dp.created, m.validation, f.user_id
  LIMIT 1`,
        [userID, id, minSimilarity]
    );

    if (res.rows.length === 1) {
        return res.rows[0];
    } else {
        return null;
    }
}
