import { pool } from "../utils/database";
import { FullPainPoint } from "@/types/painpoint/FullPainPoint";

export default async function updateValidationScores() {
    const minSimilarity = Number(process.env.DATA_MIN_SIMILARITY);
    if (isNaN(minSimilarity)) {
        return;
    }
    const res = await pool.query<FullPainPoint>(
        `
  SELECT
    dp.id,
    dp.problem,
    dp.description,
    dp.created,
    COALESCE(m.validation, 0) AS validation,
    COALESCE(ARRAY_AGG(DISTINCT nn.data_point_id), '{}') AS similar,
    rd.scrape_method,
    rd.reddit_name,
    rd.reddit_ups,
    rd.reddit_comments
  FROM data_points dp
  LEFT JOIN metadata m ON m.data_point_id = dp.id
  LEFT JOIN raw_data rd ON rd.data_point_id = dp.id
  LEFT JOIN LATERAL (
    SELECT m2.data_point_id
    FROM metadata m2
    WHERE m2.data_point_id != dp.id
      AND 1 - (m.problem_embedding <=> m2.problem_embedding) >= $1
    ORDER BY m.problem_embedding <=> m2.problem_embedding
  ) AS nn ON true
  GROUP BY
    dp.id, dp.problem, dp.description, dp.created,
    m.validation,
    rd.scrape_method, rd.reddit_name, rd.reddit_ups, rd.reddit_comments;
`,
        [minSimilarity]
    );

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

function calculateValidationScore(painPoint: FullPainPoint): number {
    const comments = painPoint.reddit_comments || 0;
    const ups = painPoint.reddit_ups || 0;
    const similar = painPoint.similar.length;
    const time_since = Date.now() - new Date(painPoint.created).getTime();
    const days_since = time_since / (1000 * 60 * 60 * 24);

    return Math.round((comments * 0.8 + ups * 1.1 + similar * 5 - Math.max(5 - days_since, 0)) * 10) / 10;
}
