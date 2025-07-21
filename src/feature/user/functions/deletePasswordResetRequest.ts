import prisma from "@/lib/prisma";

export default async function deletePasswordResetRequest(
	token: string,
): Promise<void> {
	try {
		await prisma.userPasswordReset.delete({
			where: { token },
		});
	} catch (error) {
		console.error("Failed to delete password reset request:", error);
		throw error; // Re-throw the error to propagate it to the caller
	}
}
