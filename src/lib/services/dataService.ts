import { PainPoint } from "@/types/PainPoint";
import { pool } from "../utils/database";
import { OrderOptions } from "@/types/OrderOptions";

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
            COALESCE(array_agg(DISTINCT d2.data_point_id)
                FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
            (f.user_id IS NOT NULL) AS favorite
        FROM data_points dp
        LEFT JOIN metadata m ON dp.id = m.data_point_id
        LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
        LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
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
        return res.rows[0];
    } else {
        return null;
    }
}
