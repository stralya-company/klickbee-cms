import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function requestPasswordReset(email: string): Promise<string> {
	const user = await prisma.user.findUnique({
		where: { email },
		select: { id: true, email: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	// Todo: Implement rate limiting logic here

	const { token } = await prisma.userPasswordReset.create({
		data: {
			userId: user.id,
			token: randomUUID(),
			expiresAt: new Date(Date.now() + 3600000), // Token valid for 1 hour
		},
		select: { token: true },
	});

	// Here you would typically send the reset token to the user's email.
	if (!token) {
		throw new Error("Failed to create password reset token");
	}

	return token;
}
