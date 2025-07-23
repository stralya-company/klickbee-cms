import { logout } from "@stralya/auth";
import { redirect } from "next/navigation";
import "../../../lib/initSetPrismaClient";

export async function GET() {
	await logout();
	redirect("/");
}
