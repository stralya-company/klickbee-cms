import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { admin } from "better-auth/plugins";
import { sendEmail } from "@/lib/sendEmail";
import { getApiTranslation } from "@/lib/apiTranslation";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
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
					to: user.email,
					subject: emailSubject,
					text: `${emailContent}: ${url}?token=${token}`,
				});
			} catch (error) {
				console.error("Error sending reset password email:", error);
				throw new Error("Failed to send reset password email.");
			}
		},
	},
	plugins: [admin()],
});
