import { pool } from "../utils/database";

export function SetUserRoleByEmail(email: string, role: string) {
    pool.query("UPDATE users SET role = $1 WHERE email = $2", [role, email]);
}
