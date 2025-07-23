import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

export default async function resetPassword(
	token: string,
	newPassword: string,
	tx?: Prisma.TransactionClient,
): Promise<void> {
	const client = tx || prisma

	const resetRequest = await client.userPasswordReset.findUnique({
		where: { token },
	})

	if (!resetRequest) {
		throw new Error('Password reset request not found')
	}

	if (resetRequest.expiresAt && new Date() > resetRequest.expiresAt) {
		throw new Error('Password reset token has expired')
	}

	const user = await client.user.findUnique({
		select: { email: true, id: true },
		where: { id: resetRequest.userId },
	})

	if (!user) {
		throw new Error('User not found')
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10)

	await client.user.update({
		data: { password: hashedPassword },
		where: { id: user.id },
	})
}
