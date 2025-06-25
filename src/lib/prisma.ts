import { PrismaClient } from "@/generated/prisma/client";

export const prisma = new PrismaClient({
	// log: ["query", "info", "warn", "error"],
});

export default prisma;
