import { useMutation } from "@tanstack/react-query";
import { UserPasswordResetFormValues } from "@/feature/user/types/userPasswordResetSchema";

interface PasswordResetResponse {
	message: string;
}

interface PasswordResetError {
	error: string;
}

export function usePasswordReset() {
	return useMutation<
		PasswordResetResponse,
		Error,
		UserPasswordResetFormValues
	>({
		mutationFn: async (data: UserPasswordResetFormValues) => {
			const res = await fetch("/api/auth/password-reset", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result: PasswordResetResponse | PasswordResetError =
				await res.json();

			if (!res.ok) {
				throw new Error(
					(result as PasswordResetError).error || "An error occurred",
				);
			}

			return result as PasswordResetResponse;
		},
	});
}
