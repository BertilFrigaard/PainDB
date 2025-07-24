import { PipelineWithLastRun } from "@/types/pipeline/PipelineWithLastRun";
import { pool } from "../utils/database";

export async function createPipeline(userID: number, subReddit: string): Promise<string | null> {
    const res = await pool.query("INSERT INTO pipelines (creator_id, sub_reddit) VALUES ($1, $2) RETURNING id", [
        userID,
        subReddit,
    ]);
    if (res.rowCount === 1) {
        return res.rows[0].id;
    } else {
        return null;
    }
}

export async function createPipelineRun(userID: number, pipelineID: string): Promise<number | null> {
    const res = await pool.query(
        "INSERT INTO pipeline_runs (executor, pipeline_id, status) VALUES ($1, $2, 'created') RETURNING id",
        [userID, pipelineID]
    );
    if (res.rowCount === 1) {
        return res.rows[0].id;
    } else {
        return null;
    }
}

export async function getPipelineSubReddit(pipelineID: string): Promise<string | null> {
    const res = await pool.query("SELECT sub_reddit FROM pipelines WHERE id = $1", [pipelineID]);
    if (res.rowCount === 1) {
        return res.rows[0].sub_reddit;
    } else {
        return null;
    }
}

export async function getPipelinesWithLastRun(): Promise<PipelineWithLastRun[]> {
    const res = await pool.query<PipelineWithLastRun>(`SELECT 
    p.id AS pipeline_id,
    p.creator_id,
    u_creator.name AS creator_name,
    p.created,
    p.sub_reddit,
    pr_last.run_started AS last_run_started,
    pr_last.run_ended AS last_run_ended,
    pr_last.status AS last_run_status,
    pr_last.additions AS last_run_additions,
    pr_last.executor AS last_run_executor,
    u_executor.name AS executor_name
FROM pipelines p
JOIN users u_creator ON u_creator.id = p.creator_id
LEFT JOIN LATERAL (
    SELECT *
    FROM pipeline_runs pr
    WHERE pr.pipeline_id = p.id
    ORDER BY pr.run_started DESC
    LIMIT 1
) pr_last ON true
LEFT JOIN users u_executor ON u_executor.id = pr_last.executor;
`);

    return res.rows;
}
