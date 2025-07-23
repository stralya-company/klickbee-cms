import { useMutation } from '@tanstack/react-query'
import { UserPasswordResetRequestFormValues } from '@/feature/user/types/userPasswordResetRequestSchema'

interface PasswordResetRequestResponse {
	message: string
}

interface PasswordResetRequestError {
	error: string
}

export function usePasswordResetRequest() {
	return useMutation<
		PasswordResetRequestResponse,
		Error,
		UserPasswordResetRequestFormValues
	>({
		mutationFn: async (data: UserPasswordResetRequestFormValues) => {
			const res = await fetch('/api/auth/password-reset-request', {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			})

			const result:
				| PasswordResetRequestResponse
				| PasswordResetRequestError = await res.json()

			if (!res.ok) {
				throw new Error(
					(result as PasswordResetRequestError).error ||
						'An error occurred',
				)
			}

			return result as PasswordResetRequestResponse
		},
	})
}
