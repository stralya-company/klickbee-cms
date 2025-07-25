import { queryOptions } from "@tanstack/react-query";
import { getUserById } from "@/lib/users";

export const userByIdOptions = (userId: string) =>
	queryOptions({
		queryFn: async () => await getUserById(userId),
		queryKey: ["user", userId] as const,
	});
