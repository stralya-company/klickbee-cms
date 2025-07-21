import prisma from "@/lib/prisma";

export async function createPasswordResetRequest(
	email: string,
): Promise<string> {
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
			expiresAt: new Date(Date.now() + 3600000), // Token valid for 1 hour
		},
		select: { token: true },
	});

	return token;
}
