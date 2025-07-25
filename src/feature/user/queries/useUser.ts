import { useSuspenseQuery } from "@tanstack/react-query";
import { userOptions } from "@/lib/react-query/query-options/users/userOptions";

export function useUser(userId: string) {
	return useSuspenseQuery(userOptions(userId));
}
