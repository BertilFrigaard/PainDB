"use client";
import { UseAlerts } from "@/contexts/AlertContext";
import { AlertDraft } from "@/types/Alert";
import { useEffect } from "react";

export default function AlertTrigger({ alert, timeout = 3000 }: { alert: AlertDraft; timeout?: number }) {
    const { addAlert } = UseAlerts();

    useEffect(() => {
        addAlert(alert, timeout);
    }, [alert, timeout, addAlert]);

    return null;
}
