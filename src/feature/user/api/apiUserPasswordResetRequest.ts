import { NextRequest, NextResponse } from "next/server";
import { requestPasswordReset } from "@/feature/user/functions/requestPasswordReset";

export async function POST(req: NextRequest) {
	let email: string;

	try {
		const body = await req.json();
		email = body.email;
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON format" },
			{ status: 400 },
		);
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!email || !emailRegex.test(email)) {
		return NextResponse.json(
			{ error: "Valid email address is required" },
			{ status: 400 },
		);
	}

	try {
		await requestPasswordReset(email);

		// Todo: Implement email sending logic here

		return NextResponse.json(
			{ message: "Password reset request successful" },
			{ status: 200 },
		);
	} catch (err: unknown) {
		if (err instanceof Error) {
			if (err.message.includes("not found")) {
				return NextResponse.json(
					{ error: "Email not found" },
					{ status: 404 },
				);
			}

			if (err.message.includes("rate limit")) {
				return NextResponse.json(
					{ error: "Too many requests" },
					{ status: 429 },
				);
			}
		}

		console.error("Unhandled error during password reset request:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
