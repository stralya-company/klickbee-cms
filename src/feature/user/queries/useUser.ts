import { useSuspenseQuery } from "@tanstack/react-query";
import { userOptions } from "@/lib/react-query/query-options/auth/userOptions";

export function useCurrentUser() {
	return useSuspenseQuery(userOptions);
}
