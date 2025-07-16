import { auth } from "@/auth";
import { restrictPage } from "@/lib/utils/pageRestriction";

export default async function Home() {
    await restrictPage();

    const session = await auth();

    return (
        <div>
            <h1>Home</h1>
            <p>user: {session?.user.role}</p>
        </div>
    );
}
