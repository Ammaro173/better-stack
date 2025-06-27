import { call } from "@orpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { appRouter } from "@/routers";

export default async function Dashboard() {
	// Get session server-side
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	// Redirect if not authenticated
	if (!session) {
		redirect("/login");
	}

	const privateData = await call(appRouter.privateData, undefined, {
		context: {
			session,
		},
	});

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {session.user.name}</p>
			<p>privateData: {JSON.stringify(privateData)}</p>
		</div>
	);
}
