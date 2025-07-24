import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/authClient";
import { userOptions } from "@/lib/react-query/query-options/userOptions";

export function useCurrentUser() {
	return useSuspenseQuery(userOptions);
}
