import bcrypt from "bcrypt";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { getApiTranslation } from "@/lib/apiTranslation";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		autoSignIn: false,
		enabled: true,
		password: {
			hash: async (password: string) => {
				const saltRounds = 10;
				return await bcrypt.hash(password, saltRounds);
			},
			verify: async ({
				password,
				hash,
			}: {
				password: string;
				hash: string;
			}) => {
				return await bcrypt.compare(password, hash);
			},
		},
		sendResetPassword: async ({ user, url, token }) => {
			const emailSubject = await getApiTranslation(
				"PasswordResetRequest",
				"EmailSubject",
			);
			const emailContent = await getApiTranslation(
				"PasswordResetRequest",
				"EmailContent",
			);

			try {
				await sendEmail({
					subject: emailSubject,
					text: `${emailContent}: ${url}?token=${token}`,
					to: user.email,
				});
			} catch (error) {
				console.error("Error sending reset password email:", error);
				throw new Error("Failed to send reset password email.");
			}
		},
	},
	plugins: [admin()],
});
