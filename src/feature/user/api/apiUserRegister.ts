import { register } from "@stralya/auth";
import { NextRequest, NextResponse } from "next/server";
import "../../../lib/initSetPrismaClient";

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();
	try {
		const user = await register(email, password);

		return NextResponse.json({ user }, { status: 201 });
	} catch (err: unknown) {
		const message =
			err instanceof Error ? err.message : "An unknown error occurred";

		return NextResponse.json({ error: message }, { status: 400 });
	}
}
