import { useSuspenseQuery } from "@tanstack/react-query";
import { userOptions } from "@/lib/react-query/query-options/userOptions";

export function useCurrentUser() {
	return useSuspenseQuery(userOptions);
}
