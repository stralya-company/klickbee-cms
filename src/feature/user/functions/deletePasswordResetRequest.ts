import prisma from "@/lib/prisma";
import { TransactionClient } from "@/lib/types/prisma";

export default async function deletePasswordResetRequest(
	token: string,
	tx?: TransactionClient,
): Promise<void> {
	const client = tx || prisma;

	await client.userPasswordReset.delete({
		where: { token },
	});
}
