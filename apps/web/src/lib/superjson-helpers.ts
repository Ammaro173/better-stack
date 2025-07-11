import superjson from "superjson";

/**
 * Helper function to serialize data with SuperJSON when you need advanced types
 * Use this in your ORPC procedures when you need Maps, Sets, BigInt, etc.
 */
export function withSuperjson<T>(data: T) {
	return superjson.serialize(data);
}

/**
 * Helper function to deserialize SuperJSON data on the client
 * Use this when consuming endpoints that use withSuperjson()
 */
export function useSuperjsonData<T>(superjsonData: any): T | null {
	try {
		return superjsonData ? superjson.deserialize(superjsonData) : null;
	} catch (error) {
		console.error("Failed to deserialize SuperJSON data:", error);
		return null;
	}
}

/**
 * Type guard to check if data is a SuperJSON serialized object
 */
export function isSuperjsonData(data: any): boolean {
	return data && typeof data === "object" && "json" in data && "meta" in data;
}

/**
 * Custom hook for using SuperJSON data in React components
 */
export function useSuperjsonQuery<T>(queryResult: {
	data?: any;
	[key: string]: any;
}) {
	const deserializedData = useSuperjsonData<T>(queryResult.data);

	return {
		...queryResult,
		data: deserializedData,
		originalData: queryResult.data,
	};
}
