import { logout } from "@stralya/auth";
import { setPrismaClient } from "@stralya/auth";
import prisma from "../../../../lib/prisma";

setPrismaClient(prisma);

export async function GET() {
	const logoutResult = await logout();
	return Response.json({ message: logoutResult }, { status: 200 });
}
