import { PrismaClient } from "@prisma/client";

export type TransactionClient = Omit<
	PrismaClient,
	"$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;
