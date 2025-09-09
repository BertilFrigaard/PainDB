import { useCallback, useEffect, useState } from "react";
import Popup from "../Popup";
import { PipelineWithLastRun } from "@/types/pipeline/PipelineWithLastRun";
import { UseAlerts } from "@/contexts/AlertContext";
import CustomTable from "@/components/tables/CustomTable/CustomTable";
import { PipelineLog } from "@/types/pipeline/PipelineLog";
import BubbleButton from "@/components/buttons/bubbleButtons/BubbleButton";

export default function PopupManagePipeline({ exitFunc, pipelineID }: { exitFunc: () => void; pipelineID: string }) {
    const [pipeline, setPipeline] = useState<PipelineWithLastRun | null>(null);
    const [logs, setLogs] = useState<PipelineLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingLogs, setLoadingLogs] = useState(false);

    const { addAlert } = UseAlerts();

    const rerunPipeline = async () => {
        setLoading(true);
        const res = await fetch("/api/pipelines/rerun", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: pipelineID }),
        });
        if (res.status === 204) {
            updatePipeline();
        } else if (res.status === 404) {
            addAlert(
                {
                    message: "No last run was found. The pipeline should be deleted and recreated before rerunning.",
                    bg: "bg-warn",
                },
                5000
            );
            setLoading(false);
        } else {
            addAlert({ message: "Excecution failed (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            setLoading(false);
        }
    };

    const deletePipeline = async () => {
        setLoading(true);
        const res = await fetch("/api/pipelines/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: pipelineID }),
        });
        if (res.status === 204) {
            exitFunc();
        } else {
            addAlert({ message: "Deletion failed (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            setLoading(false);
        }
    };

    const runPipeline = async () => {
        setLoading(true);
        const res = await fetch("/api/pipelines/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: pipelineID }),
        });
        if (res.status === 204) {
            updatePipeline();
        } else {
            addAlert({ message: "Excecution failed (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            setLoading(false);
        }
    };

    const updatePipeline = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/pipelines/" + pipelineID);
        if (res.status === 200) {
            const json = await res.json();
            setPipeline(json);
        } else {
            addAlert({ message: "Tried to fetch pipelines (error code: " + res.status + ")", bg: "bg-error" }, 3000);
        }
        setLoading(false);
    }, [pipelineID, addAlert]);

    const updateLogs = useCallback(async () => {
        setLoadingLogs(true);
        if (pipeline) {
            const res = await fetch("/api/pipelines/logs/" + pipeline.last_run_id);
            if (res.status === 200) {
                const json = await res.json();
                setLogs(json);
            } else {
                addAlert({ message: "Tried to fetch logs (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            }
        }
        setLoadingLogs(false);
    }, [pipeline, addAlert]);

    useEffect(() => {
        updatePipeline();
    }, [updatePipeline]);

    useEffect(() => {
        updateLogs();
    }, [updateLogs]);

    return (
        <Popup exitFunc={exitFunc} title="Manage Pipeline">
            {loading ? (
                <p className="text-center p-10 font-bold text-lg text-gray-500">Loading...</p>
            ) : !pipeline ? (
                <p className="text-center p-10 font-bold text-lg text-gray-500">No Data</p>
            ) : (
                <>
                    <div className="flex gap-10">
                        <div className="bg-white rounded-xl p-10 my-5 w-full">
                            <div className="py-2">
                                <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    {pipeline.sub_reddit}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Pipeline ID</p>
                                    <p className="break-all">{pipeline.pipeline_id}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Created</p>
                                    <p>{pipeline.created}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Creator</p>
                                    <p>{pipeline.creator_name}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Executor</p>
                                    <p>{pipeline.executor_name || "None"}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Last Run Started</p>
                                    <p>
                                        {pipeline.last_run_started
                                            ? new Date(pipeline.last_run_started).toLocaleString()
                                            : "None"}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Last Run Ended</p>
                                    <p>
                                        {pipeline.last_run_ended
                                            ? new Date(pipeline.last_run_ended).toLocaleString()
                                            : "None"}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Status</p>
                                    <p>{pipeline.last_run_status || "None"}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-zinc-600 dark:text-zinc-400">Additions</p>
                                    <p>{pipeline.last_run_additions || "None"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-10 my-5">
                            <div className="mb-5">
                                <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                                    Actions
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <BubbleButton onClick={updatePipeline} text="Reload" bg="bg-purple-400" />
                                {pipeline.last_run_status == "finished" ? (
                                    <BubbleButton onClick={runPipeline} text="Run" bg="bg-lime-400" />
                                ) : (
                                    <BubbleButton
                                        onClick={() => {
                                            addAlert(
                                                {
                                                    message: "Pipeline can not be run (It might be running)",
                                                    bg: "bg-warn",
                                                },
                                                3000
                                            );
                                        }}
                                        text="Run"
                                        bg="bg-gray-400"
                                    />
                                )}
                                <BubbleButton onClick={rerunPipeline} bg="bg-warn" text="Rerun" />
                                <BubbleButton onClick={deletePipeline} bg="bg-error" text="Delete" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-10 my-5">
                        <div className="mb-5">
                            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Logs</p>
                        </div>
                        <CustomTable
                            columns={[
                                { index: "message", name: "Message" },
                                { index: "time", name: "Time" },
                                {
                                    index: "level",
                                    name: "Level",
                                    centered: true,
                                    bubble: true,
                                    bubbleColor: (value) => {
                                        switch (value) {
                                            case "warn":
                                                return "bg-warn";
                                            case "error":
                                                return "bg-[#e84023]";
                                            case "critical":
                                                return "bg-error";
                                            case "info":
                                                return "bg-[#ac80ff]";
                                            case "debug":
                                                return "bg-lime-400";
                                            default:
                                                return "bg-gray-200";
                                        }
                                    },
                                },
                            ]}
                            data={logs.map((log) => {
                                return {
                                    message: log.message,
                                    level: log.level,
                                    time: new Date(log.time).toLocaleString(),
                                };
                            })}
                        />
                        {loadingLogs && (
                            <p className="text-center p-10 font-bold text-lg text-gray-500">Loading Logs...</p>
                        )}
                    </div>
                </>
            )}
        </Popup>
    );
}
