import { useSuspenseQuery } from "@tanstack/react-query";
import { allUsersOptions } from "@/lib/allUsersOptions";

export function useAllUsers() {
	return useSuspenseQuery(allUsersOptions);
}
