import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { sendVerificationRequest } from "./lib/email/sendVerificationRequest";
import { pool } from "./lib/utils/database";
import { ensureEnv } from "./lib/utils/envEnsurer";

ensureEnv([
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_USER",
    "EMAIL_PASSWORD",
    "EMAIL_FROM",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "STRIPE_SHOP_STANDARD_LINK",
]);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    trustHost: true,
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
            session.user.role = user.role ? user.role : "none";
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;

            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;

            if ([process.env.STRIPE_SHOP_STANDARD_LINK].includes(url)) {
                return url;
            }

            return baseUrl;
        },
    },
});
