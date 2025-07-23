import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { admin } from "better-auth/plugins";

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
	},
	plugins: [admin()],
});
