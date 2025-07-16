import { SetUserRoleByEmail } from "@/lib/services/userService";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    const rawBody = await req.text(); // important for Stripe signature verification
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
        return new Response("Bad Format", { status: 400 });
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: unknown) {
        console.error("Signature verification failed: " + err);
        return new Response("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const email = event.data.object.customer_details?.email;
        const paymentLink = event.data.object.payment_link;
        if (!email || !paymentLink) {
            console.error("Email or paymentLink was null ", { email, paymentLink });
            return new Response("Webhook Error", { status: 500 });
        }
        switch (paymentLink) {
            case process.env.STRIPE_STARTER_PAYMENT_LINK:
                SetUserRoleByEmail(email, "starter");
                break;
            case process.env.STRIPE_PRO_PAYMENT_LINK:
                SetUserRoleByEmail(email, "pro");
                break;
            case process.env.STRIPE_UNLIMITED_PAYMENT_LINK:
                SetUserRoleByEmail(email, "unlimited");
                break;
            default:
                console.error("unknown paymentlink: " + paymentLink);
                return new Response("OK", { status: 500 });
        }
    }

    return new Response("OK", { status: 200 });
}
