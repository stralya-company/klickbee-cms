import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export default async function resetPassword(
	token: string,
	newPassword: string,
	tx?: Prisma.TransactionClient,
): Promise<void> {
	const client = tx || prisma;

	const resetRequest = await client.userPasswordReset.findUnique({
		where: { token },
	});

	if (!resetRequest) {
		throw new Error("Password reset request not found");
	}

	if (resetRequest.expiresAt && new Date() > resetRequest.expiresAt) {
		throw new Error("Password reset token has expired");
	}

	const user = await client.user.findUnique({
		where: { id: resetRequest.userId },
		select: { id: true, email: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	await client.user.update({
		where: { id: user.id },
		data: { password: hashedPassword },
	});
}
