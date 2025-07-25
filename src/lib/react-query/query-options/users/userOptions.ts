import { queryOptions } from "@tanstack/react-query";
import { getUserById } from "@/lib/prisma/queries/users";

export const userOptions = (userId: string) =>
	queryOptions({
		queryFn: async () => await getUserById(userId),
		queryKey: ["user", userId] as const,
	});
