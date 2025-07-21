import prisma from "@/lib/prisma";

export default async function deletePasswordResetRequest(
	token: string,
): Promise<boolean> {
	await prisma.userPasswordReset.delete({
		where: { token },
	});

	return true;
}
