import { queryOptions } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/prisma/queries/users";

export const allUsersOptions = queryOptions({
	queryFn: async () => await getAllUsers(),
	queryKey: ["all_users"] as const,
});
