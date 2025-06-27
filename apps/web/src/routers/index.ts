// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { todoRouter } from "./todo";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	//! use THIS or use call from orpc/server and pass context there
	// .callable({
	// 	context: async () => {
	// 		return {
	// 			session: await auth.api.getSession({
	// 				headers: await headers(),
	// 			}),
	// 		};
	// 	},
	// })
	todo: todoRouter,
};
export type AppRouter = typeof appRouter;
