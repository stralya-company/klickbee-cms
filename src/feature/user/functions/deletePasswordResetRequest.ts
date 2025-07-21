import prisma from "@/lib/prisma";

export default async function deletePasswordResetRequest(
	token: string,
): Promise<void> {
	await prisma.userPasswordReset.delete({
		where: { token },
	});
}
