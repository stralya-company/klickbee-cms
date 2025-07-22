import z from "zod";

export const userPasswordResetSchema = z.object({
	token: z.string().uuid().min(1),
	newPassword: z.string().min(8),
});
