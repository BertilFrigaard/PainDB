export function ensureEnv(vars: string[]) {
    for (const envVar of vars) {
        if (process.env[envVar] === undefined) {
            throw new Error("Environment variable '" + envVar + "' not set!");
        }
    }
}
