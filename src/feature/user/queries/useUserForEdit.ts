import { useSuspenseQuery } from "@tanstack/react-query";
import { userByIdForEditOptions } from "@/lib/userByIdOptions";

export function useUserForEdit(userId: string) {
	return useSuspenseQuery(userByIdForEditOptions(userId));
}
