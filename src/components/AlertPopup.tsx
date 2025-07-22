import { Alert } from "@/types/Alert";

export default function AlertPopup({ alerts }: { alerts: Alert[] }) {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3 items-end pointer-events-none">
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className={
                        alert.bg +
                        " text-white px-6 py-3 rounded-xl shadow-lg min-w-[220px] max-w-xs text-sm font-semibold pointer-events-auto animate-fade-in"
                    }
                >
                    <p>{alert.message}</p>
                </div>
            ))}
        </div>
    );
}
