import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetRequest } from "@/feature/user/functions/createPasswordResetRequest";
import { userPasswordResetRequestSchema } from "@/feature/user/types/userPasswordResetRequestSchema";

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

	const { success } = userPasswordResetRequestSchema.safeParse({ email });

	if (!email || !success) {
		return NextResponse.json(
			{ error: "Valid email address is required" },
			{ status: 400 },
		);
	}

	try {
		await createPasswordResetRequest(email);

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
		}

		console.error("Unhandled error during password reset request:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
