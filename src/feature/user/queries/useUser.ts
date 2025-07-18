import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
	return useQuery({
		queryKey: ["current_user"],
		queryFn: async () => {
			const res = await fetch("/api/auth/me");
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Error retrieving user");
			return data.user;
		},
		retry: false,
	});
}
