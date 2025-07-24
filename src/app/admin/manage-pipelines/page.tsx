import PipelineAdminInterface from "@/components/sections/PipelineAdminInterface";

export default async function ManagePipelines() {
    return (
        <main className="px-30 py-10">
            <h1 className="text-3xl font-bold text-secondary text-center mb-10">Manage Pipelines</h1>
            <PipelineAdminInterface />
        </main>
    );
}
