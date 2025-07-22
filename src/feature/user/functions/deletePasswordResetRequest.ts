import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function deletePasswordResetRequest(
	token: string,
	tx?: Prisma.TransactionClient,
): Promise<void> {
	const client = tx || prisma;

	await client.userPasswordReset.delete({
		where: { token },
	});
}
