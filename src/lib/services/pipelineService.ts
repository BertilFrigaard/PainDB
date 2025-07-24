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
