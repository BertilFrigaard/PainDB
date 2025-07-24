export function getRollbackUnixTimestamp(days: number) {
    const now = new Date();
    const rollbackDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return toUnixTimestamp(rollbackDate);
}

export function toUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
}
