import z from "zod";

export const userPasswordResetSchema = z.object({
	token: z
		.string()
		.uuid({ message: "Invalid token" })
		.min(1, { message: "Token is required" }),
	newPassword: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" }),
});
