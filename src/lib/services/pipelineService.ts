import { PipelineWithLastRun } from "@/types/pipeline/PipelineWithLastRun";
import { pool } from "../utils/database";
import { PipelineLog } from "@/types/pipeline/PipelineLog";

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

export async function deletePipelineRunData(pipelineRunID: number): Promise<void> {
    await pool.query(
        "DELETE FROM data_points WHERE id IN (SELECT data_point_id FROM raw_data WHERE pipeline_run_id = $1)",
        [pipelineRunID]
    );
}

export async function deletePipelineRun(pipelineRunID: number): Promise<void> {
    await pool.query(
        `DELETE FROM pipeline_runs
         WHERE id = $1`,
        [pipelineRunID]
    );
}

export async function getPipelineLastRun(pipelineID: string): Promise<number | null> {
    const res = await pool.query(
        "SELECT id FROM pipeline_runs WHERE pipeline_id = $1 ORDER BY run_started DESC LIMIT 1",
        [pipelineID]
    );
    if (res.rowCount !== 1) return null;

    return res.rows[0].id;
}

export async function getPipelinesLastRunStarted(pipelineID: string): Promise<string | null> {
    const res = await pool.query(
        `SELECT run_started
         FROM pipeline_runs
         WHERE pipeline_id = $1
         ORDER BY run_started DESC
         LIMIT 1`,
        [pipelineID]
    );

    if (res.rowCount !== 1) return null;

    return res.rows[0].run_started;
}

export async function deletePipeline(pipelineID: string) {
    await pool.query("DELETE FROM pipelines WHERE id = $1", [pipelineID]);
}

export async function getPipelinesWithLastRun(): Promise<PipelineWithLastRun[]> {
    const res = await pool.query<PipelineWithLastRun>(`SELECT 
    p.id AS pipeline_id,
    p.creator_id,
    u_creator.name AS creator_name,
    p.created,
    p.sub_reddit,
    pr_last.id AS last_run_id,
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

export async function getPipelineWithLastRunByID(pipelineID: string) {
    const res = await pool.query<PipelineWithLastRun>(
        `
    SELECT 
        p.id AS pipeline_id,
        p.creator_id,
        u_creator.name AS creator_name,
        p.created,
        p.sub_reddit,
        pr_last.id AS last_run_id,
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
    LEFT JOIN users u_executor ON u_executor.id = pr_last.executor
    WHERE p.id = $1
`,
        [pipelineID]
    );

    if (res.rowCount === 1) {
        return res.rows[0];
    } else {
        return null;
    }
}

export async function getLogsByPipelineRunID(pipelineRunID: number) {
    const res = await pool.query<PipelineLog>(
        "SELECT * FROM pipeline_run_logs WHERE pipeline_run_id = $1 ORDER BY time DESC",
        [pipelineRunID]
    );
    return res.rows;
}

export async function getCountPipelines(): Promise<number> {
    const res = await pool.query("SELECT COUNT(*) FROM pipelines");
    return res.rows[0].count;
}

export async function getLastRun(): Promise<number | null> {
    const res = await pool.query("SELECT run_started FROM pipeline_runs ORDER BY run_started DESC LIMIT 1");
    if (res.rows.length <= 0) {
        return null;
    }
    return res.rows[0].run_started;
}
