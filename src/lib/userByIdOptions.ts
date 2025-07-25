import { queryOptions } from "@tanstack/react-query";
import { getUserByIdForEdit } from "@/lib/users";

export const userByIdForEditOptions = (userId: string) =>
	queryOptions({
		queryFn: async () => await getUserByIdForEdit(userId),
		queryKey: ["user", "edit", userId] as const,
	});
