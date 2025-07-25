import { spawn } from "child_process";
import path from "path";
import { getPipelineSubReddit } from "./pipelineService";

export async function startPipelineScript(pipelineID: string, pipelineRunID: number, stopTimestamp: number) {
    const subReddit = await getPipelineSubReddit(pipelineID);

    if (!subReddit) {
        throw new Error("Failed to get pipeline target subreddit");
    }

    const scriptPath = path.resolve(process.cwd(), "src", "scripts", "pipeline.py");

    const pipelineProcess = spawn(process.env.DEV ? "py" : "python3", [
        scriptPath,
        pipelineID,
        pipelineRunID.toString(),
        subReddit,
        stopTimestamp.toString(),
        "-u",
    ]);

    pipelineProcess.on("error", (err) => {
        console.error("[PIPELINE ERROR]: Failed to start process: ", err);
    });

    pipelineProcess.stdout.on("data", (data) => {
        console.log(`[PIPELINE STDOUT]: ${data}`);
    });

    pipelineProcess.stderr.on("data", (data) => {
        console.error(`[PIPELINE STDERR]: ${data}`);
    });

    pipelineProcess.on("close", (code) => {
        console.log(`[PIPELINE EXIT]: exited with code ${code}`);
    });
}
