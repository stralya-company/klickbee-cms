import { useMutation } from "@tanstack/react-query";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { CreateUserFormValues } from "@/feature/user/types/createUserSchema";
import { authClient } from "@/lib/better-auth/authClient";

export function useCreateUser() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	return useMutation({
		mutationFn: async (createUserFormValues: CreateUserFormValues) => {
			await authClient.admin.createUser({
				...createUserFormValues,
				password: "", // empty password, user will set it via password reset
				role: "user",
			});

			await authClient.requestPasswordReset({
				email: createUserFormValues.email,
				redirectTo: `/admin/${adminKey}/auth/password-reset`,
			});
		},
	});
}
