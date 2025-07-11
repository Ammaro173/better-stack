"use client";

import { useQuery } from "@tanstack/react-query";
import { useSuperjsonData } from "@/lib/superjson-helpers";
import { orpc } from "@/utils/orpc";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

export default function Home() {
	const healthCheck = useQuery(orpc.healthCheck.queryOptions());
	const dateTest = useQuery(orpc.todo.testDate.queryOptions());
	const superjsonTest = useQuery(orpc.todo.testSuperjson.queryOptions());

	// Deserialize superjson data using helper
	const superjsonData = useSuperjsonData(superjsonTest.data);

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
			<div className="grid gap-6">
				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">API Status</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
						/>
						<span className="text-muted-foreground text-sm">
							{healthCheck.isLoading
								? "Checking..."
								: healthCheck.data
									? "Connected"
									: "Disconnected"}
						</span>
					</div>
				</section>

				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">Date Test (ORPC Default)</h2>
					<p className="mb-2 text-gray-600 text-sm">
						✅ Dates work great | ❌ Maps/Sets become empty objects
					</p>
					{dateTest.isLoading ? (
						<p>Loading...</p>
					) : dateTest.error ? (
						<p className="text-red-500">Error: {dateTest.error.message}</p>
					) : (
						<div className="space-y-2">
							<div>
								<strong>Current Date:</strong>{" "}
								{dateTest.data?.currentDate?.toString()}
								<br />
								<small>Type: {typeof dateTest.data?.currentDate}</small>
							</div>
							<div>
								<strong>Map:</strong>{" "}
								{JSON.stringify(dateTest.data?.nested?.map)} ❌
								<br />
								<small>Type: {typeof dateTest.data?.nested?.map}</small>
							</div>
							<div>
								<strong>Set:</strong>{" "}
								{JSON.stringify(dateTest.data?.nested?.set)} ❌
								<br />
								<small>Type: {typeof dateTest.data?.nested?.set}</small>
							</div>
						</div>
					)}
				</section>

				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">SuperJSON Test ✨</h2>
					<p className="mb-2 text-gray-600 text-sm">
						✅ All types preserved perfectly with helper functions
					</p>
					{superjsonTest.isLoading ? (
						<p>Loading...</p>
					) : superjsonTest.error ? (
						<p className="text-red-500">Error: {superjsonTest.error.message}</p>
					) : superjsonData ? (
						<div className="space-y-2">
							<div>
								<strong>Current Date:</strong>{" "}
								{superjsonData.currentDate?.toString()} ✅
								<br />
								<small>
									Is Date:{" "}
									{superjsonData.currentDate instanceof Date ? "Yes" : "No"}
								</small>
							</div>
							<div>
								<strong>Map:</strong>{" "}
								{Array.from(superjsonData.nested?.map || [])
									.map(([k, v]) => `${k}=${JSON.stringify(v)}`)
									.join(", ")}{" "}
								✅
								<br />
								<small>
									Is Map:{" "}
									{superjsonData.nested?.map instanceof Map ? "Yes" : "No"}
								</small>
							</div>
							<div>
								<strong>Set:</strong>{" "}
								{Array.from(superjsonData.nested?.set || []).join(", ")} ✅
								<br />
								<small>
									Is Set:{" "}
									{superjsonData.nested?.set instanceof Set ? "Yes" : "No"}
								</small>
							</div>
							<div>
								<strong>BigInt:</strong>{" "}
								{superjsonData.nested?.bigInt?.toString()} ✅
								<br />
								<small>Type: {typeof superjsonData.nested?.bigInt}</small>
							</div>
							<div>
								<strong>RegExp:</strong>{" "}
								{superjsonData.nested?.regex?.toString()} ✅
								<br />
								<small>
									Is RegExp:{" "}
									{superjsonData.nested?.regex instanceof RegExp ? "Yes" : "No"}
								</small>
							</div>
						</div>
					) : (
						<p>No data</p>
					)}
				</section>

				<section className="rounded-lg border border-green-200 bg-green-50 p-4">
					<h2 className="mb-2 font-medium text-green-800">
						🎉 SuperJSON Successfully Configured!
					</h2>
					<div className="space-y-1 text-green-700 text-sm">
						<p>
							<strong>✅ Ready to use:</strong> SuperJSON is now available in
							your project
						</p>
						<p>
							<strong>🚀 Best practice:</strong> Use ORPC default for simple
							data, SuperJSON for Maps/Sets/BigInt
						</p>
						<p>
							<strong>📚 Helper functions:</strong> <code>withSuperjson()</code>{" "}
							and <code>useSuperjsonData()</code>
						</p>
						<p>
							<strong>🔧 Clean up:</strong> You can remove these test endpoints
							when ready
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
