import z from "zod/v4";
import { Todo } from "../db/models/todo.model";
import { publicProcedure } from "../lib/orpc";
import { withSuperjson } from "../lib/superjson-helpers";

export const todoRouter = {
	getAll: publicProcedure.handler(async () => {
		return await Todo.find().lean();
	}),

	create: publicProcedure
		.input(z.object({ text: z.string().min(1) }))
		.handler(async ({ input }) => {
			const newTodo = await Todo.create({ text: input.text });
			return newTodo.toObject();
		}),

	toggle: publicProcedure
		.input(z.object({ id: z.string(), completed: z.boolean() }))
		.handler(async ({ input }) => {
			await Todo.updateOne({ id: input.id }, { completed: input.completed });
			return { success: true };
		}),

	delete: publicProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			await Todo.deleteOne({ id: input.id });
			return { success: true };
		}),

	// Test endpoint to see how ORPC handles Date objects
	testDate: publicProcedure.handler(() => {
		return {
			currentDate: new Date(),
			message: "Testing Date serialization",
			nested: {
				anotherDate: new Date(2024, 0, 1),
				map: new Map([["key", "value"]]),
				set: new Set([1, 2, 3]),
			},
		};
	}),

	// Test endpoint using superjson for advanced types (cleaner with helper)
	testSuperjson: publicProcedure.handler(() => {
		const data = {
			currentDate: new Date(),
			message: "Testing SuperJSON serialization",
			nested: {
				anotherDate: new Date(2024, 0, 1),
				map: new Map<string, any>([
					["key", "value"],
					["nested", { count: 42 }],
				]),
				set: new Set([1, 2, 3, "mixed", new Date()]),
				bigInt: BigInt("123456789012345678901234567890"),
				regex: /superjson/gi,
				undefinedValue: undefined,
			},
		};

		// Use helper function for cleaner code
		return withSuperjson(data);
	}),

	// Example: Real-world usage - analytics with Maps/Sets
	getAnalytics: publicProcedure.handler(async () => {
		// Simulate analytics data that benefits from Maps/Sets
		const userActivityMap = new Map([
			["user1", { views: 10, clicks: 3 }],
			["user2", { views: 5, clicks: 1 }],
			["user3", { views: 15, clicks: 8 }],
		]);

		const popularTags = new Set(["react", "typescript", "nextjs", "orpc"]);

		const data = {
			lastUpdated: new Date(),
			userActivity: userActivityMap,
			popularTags,
			totalUsers: BigInt(userActivityMap.size),
			// Regular data still works fine
			summary: {
				totalViews: 30,
				totalClicks: 12,
				conversionRate: 0.4,
			},
		};

		return withSuperjson(data);
	}),
};
