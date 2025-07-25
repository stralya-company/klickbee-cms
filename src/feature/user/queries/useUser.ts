import { useSuspenseQuery } from "@tanstack/react-query";
import { userByIdOptions } from "@/lib/userByIdOptions";

export function useUser(userId: string) {
	return useSuspenseQuery(userByIdOptions(userId));
}
