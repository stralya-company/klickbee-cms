import z from "zod";

export const userPasswordResetRequestSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.min(1, { message: "Email is required" }),
});

export type UserPasswordResetRequestFormValues = z.infer<
	typeof userPasswordResetRequestSchema
>;
