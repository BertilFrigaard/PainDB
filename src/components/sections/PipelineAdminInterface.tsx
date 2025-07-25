"use client";

import { UseAlerts } from "@/contexts/AlertContext";
import { PipelineWithLastRun } from "@/types/pipeline/PipelineWithLastRun";
import { useEffect, useState } from "react";
import DataTable from "../tables/DataTable/DataTable";
import SmallButtonSecondary from "../buttons/smallButtons/SmallButtonSecondary";
import SmallButtonPrimary from "../buttons/smallButtons/SmallButtonPrimary";
import Popup from "../popups/Popup";
import CustomTable from "../tables/CustomTable/CustomTable";
import { getRollbackUnixTimestamp } from "@/lib/utils/timestamps";
import PopupManagePipeline from "../popups/custom/PopupManagePipeline";

export default function PipelineAdminInterface() {
    const [loading, setLoading] = useState(true);
    const [pipelines, setPipelines] = useState<PipelineWithLastRun[]>([]);
    const [createPopupSubReddit, setCreatePopupSubReddit] = useState("");
    const [createPopupRetroactiveDays, setCreatePopupRetroactiveDays] = useState("0");
    const [createPopup, setCreatePopup] = useState(false);
    const [managePopupPipelineID, setManagePopupPipelineID] = useState<null | string>(null);
    const [managePopup, setManagePopup] = useState(false);

    const { addAlert } = UseAlerts();

    const addPipeline = async () => {
        if (!createPopupSubReddit) {
            addAlert({ message: "Please provide subreddit", bg: "bg-error" }, 3000);
            return;
        }
        if (!createPopupSubReddit.startsWith("r/")) {
            addAlert({ message: "Subreddit should start with r/", bg: "bg-error" }, 3000);
            return;
        }
        const retroactiveDays = Number(createPopupRetroactiveDays);
        if (isNaN(retroactiveDays)) {
            addAlert({ message: "Please provide a valid number for retroactive days", bg: "bg-error" }, 3000);
            return;
        }

        if (retroactiveDays < 0 || retroactiveDays > 60) {
            addAlert(
                {
                    message: "The number provided for retroactive days were either too large or too small",
                    bg: "bg-error",
                },
                3000
            );
            return;
        }

        setLoading(true);
        const res = await fetch("/api/pipelines/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sub_reddit: createPopupSubReddit,
                from: getRollbackUnixTimestamp(retroactiveDays),
                run_retroactive: retroactiveDays !== 0,
            }),
        });
        if (res.status === 204) {
            setCreatePopup(false);
            setCreatePopupSubReddit("");
            setCreatePopupRetroactiveDays("0");
        } else {
            addAlert({ message: "Creation failed (error code: " + res.status + ")", bg: "bg-error" }, 3000);
        }
        setLoading(false);
    };

    const runPipeline = async (pipelineID: string) => {
        setLoading(true);
        const res = await fetch("/api/pipelines/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: pipelineID }),
        });
        if (res.status === 204) {
            updatePipelines();
        } else {
            addAlert({ message: "Excecution failed (error code: " + res.status + ")", bg: "bg-error" }, 3000);
            setLoading(false);
        }
    };

    const updatePipelines = async () => {
        setLoading(true);
        const res = await fetch("/api/pipelines");
        if (res.status === 200) {
            const json = await res.json();
            setPipelines(json);
        } else {
            addAlert({ message: "Tried to fetch pipelines (error code: " + res.status + ")", bg: "bg-error" }, 3000);
        }
        setLoading(false);
    };

    useEffect(() => {
        updatePipelines();
    }, []);

    return (
        <section className="mx-auto bg-white rounded-xl shadow-md py-8 px-13">
            {createPopup && (
                <Popup
                    exitFunc={() => {
                        setCreatePopup(false);
                    }}
                    title="Create New Pipeline"
                >
                    <form action={addPipeline} className="flex flex-col gap-8 w-full max-w-md mt-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="subreddit" className="text-sm text-muted font-medium">
                                    Subreddit (include <span className="font-mono">r/</span>)
                                </label>
                                <input
                                    id="subreddit"
                                    name="subreddit"
                                    type="text"
                                    value={createPopupSubReddit}
                                    onChange={(e) => {
                                        setCreatePopupSubReddit(e.target.value);
                                    }}
                                    placeholder="r/example"
                                    className="px-4 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="retroactive" className="text-sm text-muted font-medium">
                                    Retroactive days
                                </label>
                                <input
                                    id="retroactive"
                                    name="retroactive"
                                    type="text"
                                    value={createPopupRetroactiveDays}
                                    onChange={(e) => {
                                        setCreatePopupRetroactiveDays(e.target.value);
                                    }}
                                    className="px-4 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="self-start px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition cursor-pointer"
                        >
                            Create
                        </button>
                    </form>
                </Popup>
            )}
            {managePopup && managePopupPipelineID !== null && (
                <PopupManagePipeline
                    exitFunc={() => {
                        setManagePopup(false);
                        updatePipelines();
                    }}
                    pipelineID={managePopupPipelineID}
                />
            )}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">Current Pipelines</h2>

                <div className="flex items-center gap-3  text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                        />
                    </svg>
                    <span className="text-sm">Click a row to see more details</span>
                </div>
            </div>
            <div className="my-6 space-y-4">
                <div className="gap-2 flex">
                    <SmallButtonPrimary text="Refresh" onClick={updatePipelines} />
                    <SmallButtonSecondary
                        text="Create Pipeline"
                        onClick={() => {
                            setCreatePopup(true);
                        }}
                    />
                </div>
            </div>
            {loading ? (
                <>
                    <DataTable data={[]} />
                    <p className="text-center p-10 font-bold text-lg text-gray-500">Loading</p>
                </>
            ) : (
                <>
                    <CustomTable
                        columns={[
                            { index: "sub_reddit", name: "Sub Reddit" },
                            { index: "creator", name: "Creator" },
                            { index: "last_run", name: "Last Run", defaultValue: "None" },
                            {
                                index: "additions",
                                name: "Additions",
                                centered: true,
                                defaultValue: "0",
                                bubble: true,
                                bubbleColor: (value) => {
                                    switch (value) {
                                        case "0":
                                            return "bg-error";
                                        default:
                                            return "bg-lime-500";
                                    }
                                },
                            },
                            {
                                index: "status",
                                name: "Status",
                                centered: true,
                                defaultValue: "waiting",
                                bubble: true,
                                bubbleColor: (value) => {
                                    switch (value) {
                                        case "finished":
                                            return "bg-lime-500";
                                        case "embedding":
                                            return "bg-yellow-600";
                                        case "extracting":
                                            return "bg-yellow-400";
                                        case "scraping":
                                            return "bg-yellow-200";
                                        default:
                                            return "bg-gray-200";
                                    }
                                },
                            },
                            {
                                index: "",
                                name: "",
                                centered: true,
                                defaultValue: "Run",
                                bubble: true,
                                bubbleColor: () => {
                                    return "bg-lime-500";
                                },
                                button: true,
                                buttonClicked: (row) => {
                                    if (row.id) {
                                        runPipeline(row.id);
                                    } else {
                                        addAlert(
                                            { message: "Failed to relate row to pipeline id", bg: "bg-error" },
                                            3000
                                        );
                                    }
                                },
                            },
                            {
                                index: "",
                                name: "",
                                defaultValue: "Manage",
                                centered: true,
                                bubble: true,
                                bubbleColor: () => {
                                    return "bg-primary";
                                },
                                button: true,
                                buttonClicked: (row) => {
                                    if (row.id) {
                                        setManagePopupPipelineID(row.id);
                                        setManagePopup(true);
                                    } else {
                                        addAlert(
                                            { message: "Failed to relate row to pipeline id", bg: "bg-error" },
                                            3000
                                        );
                                    }
                                },
                            },
                        ]}
                        data={pipelines.map((p) => {
                            return {
                                id: p.pipeline_id,
                                sub_reddit: p.sub_reddit,
                                status: p.last_run_status,
                                additions: p.last_run_additions ? String(p.last_run_additions) : null,
                                creator: p.creator_name,
                                last_run: p.last_run_started ? new Date(p.last_run_started).toLocaleString() : null,
                            };
                        })}
                    />
                    {pipelines.length === 0 && (
                        <p className="text-center p-10 font-bold text-lg text-gray-500 ">No Data</p>
                    )}
                </>
            )}
        </section>
    );
}
