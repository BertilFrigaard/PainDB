import { Pool } from "pg";
import { ensureEnv } from "./envEnsurer";

ensureEnv(["PGUSER", "PGPASSWORD", "PGHOST", "PGPORT", "PGDATABASE"]);

export const pool: Pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 5000,
    //TODO look into ssl
});
