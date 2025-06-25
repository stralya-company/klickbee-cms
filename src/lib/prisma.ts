import { PrismaClient } from "./../../src/generated/prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
        // log: ["query", "info", "warn", "error"],
    });
} else {
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient({
            // log: ["query", "info", "warn", "error"],
        });
    }
    prisma = globalThis.prisma;
}
export default prisma;
