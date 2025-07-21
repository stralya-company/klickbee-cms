import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function resetPassword(
	token: string,
	newPassword: string,
): Promise<void> {
	const resetRequest = await prisma.userPasswordReset.findUnique({
		where: { token },
	});

	if (!resetRequest) {
		throw new Error("Password reset request not found");
	}

	if (resetRequest.expiresAt && new Date() > resetRequest.expiresAt) {
		throw new Error("Password reset token has expired");
	}

	const user = await prisma.user.findUnique({
		where: { id: resetRequest.userId },
		select: { id: true, email: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	await prisma.user.update({
		where: { id: user.id },
		data: { password: hashedPassword },
	});
}
