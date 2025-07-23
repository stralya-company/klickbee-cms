import z from 'zod'

export const userPasswordResetSchema = z.object({
	newPassword: z.string().min(8),
	token: z.string().uuid().min(1),
})
