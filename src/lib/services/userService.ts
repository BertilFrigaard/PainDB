import { pool } from "../utils/database";

export async function SetUserRoleByEmail(email: string, role: string) {
    pool.query("UPDATE users SET role = $1 WHERE email = $2", [role, email]);
}

export async function setUserName(userID: number, name: string) {
    pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, userID]);
}
