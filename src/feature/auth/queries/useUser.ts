import { useSuspenseQuery } from "@tanstack/react-query";
import { userOptions } from "@/lib/userOptions";

export function useCurrentUser() {
	return useSuspenseQuery(userOptions);
}
