"use client";
import AlertPopup from "@/components/alert/AlertPopup";
import { Alert, AlertContextType, AlertDraft } from "@/types/Alert";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

const AlertContext = createContext<AlertContextType>({
    addAlert: () => {
        throw new Error("addAlert was called outside of AlertProvider");
    },
});

export const UseAlerts = () => {
    return useContext(AlertContext);
};

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = useCallback((alert: AlertDraft, timeout: number) => {
        const id = Date.now();
        const finalAlert: Alert = { ...alert, id };

        setAlerts((prev: Alert[]) => [...prev, finalAlert]);

        setTimeout(() => {
            setAlerts((prev: Alert[]) =>
                prev.filter((alert) => {
                    return alert.id !== id;
                })
            );
        }, timeout);
    }, []);

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}
            <AlertPopup alerts={alerts} />
        </AlertContext.Provider>
    );
}
