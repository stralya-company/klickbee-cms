import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/authClient";

export function useCurrentUser() {
	return useQuery({
		queryFn: async () => {
			const { data: session } = await authClient.getSession();
			return session?.user || null;
		},
		queryKey: ["current_user"],
		retry: false,
	});
}
