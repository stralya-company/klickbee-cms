import { useMutation } from "@tanstack/react-query";
import { UserPasswordResetRequestFormValues } from "@/feature/user/types/userPasswordResetRequestSchema";

interface PasswordResetRequestError {
	error: string;
}

export function usePasswordResetRequest() {
	return useMutation<void, Error, UserPasswordResetRequestFormValues>({
		mutationFn: async (data: UserPasswordResetRequestFormValues) => {
			const res = await fetch("/api/auth/password-reset-request", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result: void | PasswordResetRequestError = await res.json();

			if (!res.ok) {
				throw new Error(
					(result as PasswordResetRequestError).error ||
						"An error occurred",
				);
			}
		},
	});
}
