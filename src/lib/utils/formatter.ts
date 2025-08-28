export function formatDate(date: string | number | Date) {
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

export function formatDatePrecise(date: string | number | Date) {
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}
