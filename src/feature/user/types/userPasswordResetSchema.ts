import z from "zod";

export const userPasswordResetSchema = z
	.object({
		token: z.string().uuid().min(1),
		newPassword: z.string().min(8),
		confirmNewPassword: z.string().min(8),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		path: ["confirmNewPassword"],
	});

export type UserPasswordResetFormValues = z.infer<
	typeof userPasswordResetSchema
>;
