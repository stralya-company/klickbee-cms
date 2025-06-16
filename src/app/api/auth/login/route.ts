import { setPrismaClient, login } from "@stralya/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

setPrismaClient(prisma);

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();
	try {
		const data = await login(email, password);
		if (!data) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			);
		}

		return NextResponse.json({ data }, { status: 200 });
	} catch (err: unknown) {
		const message =
			err instanceof Error ? err.message : "An unknown error occurred";

		return NextResponse.json({ error: message }, { status: 401 });
	}
}
