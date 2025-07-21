import { useMutation } from "@tanstack/react-query";
import { UserPasswordResetRequestSchema } from "@/feature/user/types/userPasswordResetRequestSchema";

export function usePasswordResetRequest() {
	return useMutation({
		mutationFn: async (data: UserPasswordResetRequestSchema) => {
			const res = await fetch("/api/auth/password-reset-request", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.error || "An error occurred");
			}

			return result;
		},
	});
}
