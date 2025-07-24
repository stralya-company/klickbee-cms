import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

async function getSession(req: NextRequest) {
	try {
		return await auth.api.getSession({
			headers: req.headers,
		});
	} catch (error) {
		console.error("Error getting session:", error);
		return null;
	}
}

export async function isAuthenticatedGuard(req: NextRequest) {
	try {
		const session = await getSession(req);

		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		return null;
	} catch (error) {
		console.error("Error in isAuthenticatedGuard:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 401 },
		);
	}
}
