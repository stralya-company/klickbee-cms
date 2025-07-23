import prisma from '@/lib/prisma'

export async function createPasswordResetRequest(
	email: string,
): Promise<string> {
	const user = await prisma.user.findUnique({
		select: { email: true, id: true },
		where: { email },
	})

	if (!user) {
		throw new Error('User not found')
	}

	const { token } = await prisma.userPasswordReset.create({
		data: {
			expiresAt: new Date(Date.now() + 3600000), // Token valid for 1 hour
			userId: user.id,
		},
		select: { token: true },
	})

	return token
}
