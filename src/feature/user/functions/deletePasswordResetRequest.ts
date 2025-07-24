import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export default async function deletePasswordResetRequest(
	token: string,
	tx?: Prisma.TransactionClient,
): Promise<void> {
	const client = tx || prisma;

	await client.userPasswordReset.delete({
		where: { token },
	});
}
