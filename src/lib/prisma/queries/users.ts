"use server";

import { isAuthenticatedGuard } from "@/lib/better-auth/session";
import { prisma } from "@/lib/prisma/prisma";

export const getAllUsers = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.user.findMany({
		select: {
			createdAt: true,
			id: true,
			image: true,
			name: true,
		},
	});
};
