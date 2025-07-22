import { pool } from "../utils/database";
import { BigPainPoint } from "@/types/BigPainPoint";

export default async function updateValidationScores() {
    const res = await pool.query<BigPainPoint>(`SELECT
    dp.id,
    dp.problem,
    dp.description,
    dp.created,
    COALESCE(m.validation, 0) AS validation,
    COALESCE(array_agg(DISTINCT d2.data_point_id) 
             FILTER (WHERE d2.data_point_id IS DISTINCT FROM dp.id), '{}') AS duplicates,
    rd.scrape_method,
    rd.reddit_name,
    rd.reddit_ups,
    rd.reddit_comments
FROM data_points dp
LEFT JOIN metadata m ON m.data_point_id = dp.id
LEFT JOIN raw_data rd ON rd.data_point_id = dp.id
LEFT JOIN duplicates d1 ON dp.id = d1.data_point_id
LEFT JOIN duplicates d2 ON d1.group_id = d2.group_id
GROUP BY
    dp.id, dp.problem, dp.description, dp.created,
    m.validation,
    rd.scrape_method, rd.reddit_name, rd.reddit_ups, rd.reddit_comments;
`);

    if (!res.rowCount) {
        console.log("Nothing to validate");
        return;
    }

    const output = res.rows.map((row) => ({
        id: row.id,
        validation: calculateValidationScore(row),
    }));

    const insertValues = output.map((o, i) => `($${i * 2 + 1}::uuid, $${i * 2 + 2}::double precision)`).join(", ");
    const insertParams = output.flatMap((o) => [o.id, o.validation]);

    const insertQuery = `
  INSERT INTO metadata (data_point_id, validation)
  VALUES ${insertValues}
  ON CONFLICT (data_point_id) DO UPDATE SET validation = EXCLUDED.validation;
`;

    await pool.query(insertQuery, insertParams);
}

function calculateValidationScore(painPoint: BigPainPoint): number {
    const comments = painPoint.reddit_comments || 0;
    const ups = painPoint.reddit_ups || 0;
    const duplicates = painPoint.duplicates.length;
    const time_since = Date.now() - new Date(painPoint.created).getTime();
    const days_since = time_since / (1000 * 60 * 60 * 24);

    return Math.round((comments * 0.8 + ups * 1.1 + duplicates * 5 - Math.max(5 - days_since, 0)) * 10) / 10;
}
