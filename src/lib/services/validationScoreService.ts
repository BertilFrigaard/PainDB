import { pool } from "../utils/database";
import { FullPainPoint } from "@/types/painpoint/FullPainPoint";
import { ensureEnv } from "../utils/envEnsurer";

ensureEnv(["DATA_MIN_SIMILARITY"]);

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
  COALESCE(m.validation, 0)    AS validation,
  COALESCE(m.actionability, 0) AS actionability,
  COALESCE(
    ARRAY_AGG(DISTINCT nn.data_point_id) 
      FILTER (WHERE nn.data_point_id IS NOT NULL),
    '{}'::uuid[]
  ) AS similar,
  rd.reddit_ups,
  rd.reddit_comments
FROM data_points dp
LEFT JOIN metadata m ON m.data_point_id = dp.id
LEFT JOIN (
  SELECT
    data_point_id,
    MAX(reddit_ups)      AS reddit_ups,
    MAX(reddit_comments) AS reddit_comments
  FROM raw_data
  GROUP BY data_point_id
) rd ON rd.data_point_id = dp.id
LEFT JOIN LATERAL (
  SELECT m2.data_point_id
  FROM metadata m2
  WHERE m2.data_point_id <> dp.id
    AND m.problem_embedding IS NOT NULL
    AND m2.problem_embedding IS NOT NULL
    -- using cosine distance on pgvector: similarity = 1 - distance
    AND 1 - (m.problem_embedding <=> m2.problem_embedding) >= $1
  ORDER BY m.problem_embedding <=> m2.problem_embedding
  LIMIT 20
) AS nn ON TRUE
GROUP BY
  dp.id, dp.problem, dp.description, dp.created,
  m.validation, m.actionability,
  rd.reddit_ups, rd.reddit_comments;
`,
        [minSimilarity]
    );

    if (!res.rowCount) {
        console.log("Nothing to validate");
        return;
    }

    const output = res.rows.map((row) => ({
        id: row.id,
        validation: calculateValidationScoreV2(row),
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

/* function calculateValidationScore(painPoint: FullPainPoint): number {
    const comments = painPoint.reddit_comments || 0;
    const ups = painPoint.reddit_ups || 0;
    const similar = painPoint.similar.length;

    const createdDate = new Date(painPoint.created).getTime();
    const daysSince = (Date.now() - createdDate) / (1000 * 60 * 60 * 24);

    const halfLife = 30;
    const timeDecay = Math.pow(0.5, daysSince / halfLife);

    const commentWeight = 1.2;
    const upvoteWeight = 1.0;
    const similarWeight = 4.0;

    const rawScore = comments * commentWeight + ups * upvoteWeight + similar * similarWeight;

    const finalScore = rawScore * Math.max(timeDecay, 0.2);

    return Math.round(finalScore * 10) / 10;
} */

function calculateValidationScoreV2(painPoint: FullPainPoint): number {
    const comments = painPoint.reddit_comments || 0;
    const ups = painPoint.reddit_ups || 0;
    const similar = painPoint.similar.length;

    const createdDate = new Date(painPoint.created).getTime();
    const daysSince = (Date.now() - createdDate) / (1000 * 60 * 60 * 24);

    // Actionability factor
    const actionability = painPoint.actionability || 0 / 100;

    // Engagement factor
    const engagement = Math.min(ups * 1 + comments * 2, actionability / 2);

    // Repitition
    const repitition = Math.min(similar * 4, actionability * 0.5);

    // Time decay
    const decay = Math.min(daysSince * 0.1, engagement);

    return Math.round((repitition + engagement - decay + actionability) * 10) / 10;

    /* 	use this:
	You are an evaluator of problems and pain points. I will give you a problem statement, and your task is to assess how actionable this problem is for building a potential solution. Return one integer between 0 and 100 only. 0 means the problem is not actionable at all (too vague, unrealistic, or unfixable). 100 means the problem is extremely actionable (clear need, solvable with realistic means, and strong potential for a solution). Do not explain or output anything else besides the number. Problem XXX. Details XXX. */
}
