import { useSuspenseQuery } from "@tanstack/react-query";
import { allUsersOptions } from "@/lib/react-query/query-options/users/allUsersOptions";

export function useAllUsers() {
	return useSuspenseQuery(allUsersOptions);
}
