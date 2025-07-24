import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { Pool } from "pg";
import { sendVerificationRequest } from "./lib/email/sendVerificationRequest";

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    providers: [
        Nodemailer({
            server: {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: sendVerificationRequest,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/signup",
        error: "/",
        verifyRequest: "/verify",
    },
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            session.user.role = user.role ? user.role : "";
            return session;
        },
    },
});
