import { pool } from "../utils/database";

export async function setUserRoleByEmail(email: string, role: string) {
    await pool.query("UPDATE users SET role = $1 WHERE email = $2", [role, email]);
}

export async function ensureUser(email: string, name: string | null | undefined, role: string) {
    await pool.query(
        `
        INSERT INTO users (email, name, role)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO UPDATE
        SET 
            name = CASE
                WHEN users.name IS NULL OR users.name = '' THEN EXCLUDED.name
                ELSE users.name
            END,
            role = EXCLUDED.role
        `,
        [email, name, role]
    );
}

export async function setUserName(userID: number, name: string) {
    await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, userID]);
}
