import { useMutation } from "@tanstack/react-query";
import { UpdateUserFormValues } from "@/feature/user/types/updateUserSchema";
import { authClient } from "@/lib/better-auth/authClient";

export function useUpdateUser() {
	return useMutation({
		mutationFn: async ({
			userId,
			values,
		}: {
			userId: string;
			values: UpdateUserFormValues;
		}) => {
			const { data: updatedUser, error } =
				await authClient.admin.updateUser({
					data: {
						name: values.name,
					},
					userId,
				});
			if (error) {
				throw new Error(error.message || "Failed to update user");
			}

			return updatedUser;
		},
	});
}
