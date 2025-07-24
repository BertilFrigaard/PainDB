import { Pipeline } from "./Pipeline";

export type PipelineWithLastRun = Pipeline & {
    last_run_started: string | null;
    last_run_ended: string | null;
    last_run_status: string | null;
    last_run_additions: number | null;
    last_run_executor: number | null;
    executor_name: string | null;
};
