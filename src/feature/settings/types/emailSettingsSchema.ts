import z from "zod";

export const emailSettingsSchema = z.object({
	emailHost: z
		.string()
		.regex(
			/^(?!:\/\/)([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+|(\d{1,3}\.){3}\d{1,3})$/,
			"Invalid hostname or IP address",
		),
	emailPort: z.number().int().min(1).max(65535),
	emailSecure: z.boolean(),
	emailSender: z.string().email("Invalid email format"),
	emailUsername: z.string(),
	emailPassword: z.string().optional(),
});

export type EmailSettingsSchema = z.infer<typeof emailSettingsSchema>;

export const checkConnectionSchema = z.object({
	to: z.string().email(),
	subject: z.string(),
	text: z.string(),
});

export type CheckConnectionSchema = z.infer<typeof checkConnectionSchema>;
