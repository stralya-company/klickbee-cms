import { logout } from "@stralya/auth";
import { setPrismaClient } from "@stralya/auth";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";

setPrismaClient(prisma);

export async function GET() {
	await logout();
	redirect("/");
}
