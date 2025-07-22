export type Alert = AlertDraft & {
    id: number;
};

export type AlertDraft = {
    message: string;
    bg: string;
};

export type AlertContextType = {
    addAlert: (alert: AlertDraft, timeout: number) => void;
};
