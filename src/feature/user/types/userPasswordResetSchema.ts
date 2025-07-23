import z from "zod";

export const userPasswordResetSchema = z
	.object({
		confirmNewPassword: z.string().min(8),
		newPassword: z.string().min(8),
		token: z.string().uuid().min(1),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		path: ["confirmNewPassword"],
	});

export type UserPasswordResetFormValues = z.infer<
	typeof userPasswordResetSchema
>;
