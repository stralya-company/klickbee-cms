import z from "zod";

export const userPasswordResetRequestSchema = z.object({
	email: z.string().email().min(1),
});

export type UserPasswordResetRequestFormValues = z.infer<
	typeof userPasswordResetRequestSchema
>;
