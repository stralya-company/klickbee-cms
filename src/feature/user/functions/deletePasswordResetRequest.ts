import prisma from "@/lib/prisma";

export default async function deletePasswordResetRequest(
	token: string,
): Promise<boolean> {
	const result = await prisma.userPasswordReset.delete({
		where: { token },
	});

	if (!result) {
		throw new Error("Failed to delete password reset request");
	}

	return true;
}
