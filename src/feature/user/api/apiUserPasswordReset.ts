import { NextRequest, NextResponse } from "next/server";
import { userPasswordResetSchema } from "@/feature/user/types/userPasswordResetSchema";
import resetPassword from "@/feature/user/functions/resetPassword";
import deletePasswordResetRequest from "@/feature/user/functions/deletePasswordResetRequest";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
	let token: string;
	let newPassword: string;

	try {
		const body = await req.json();
		newPassword = body.newPassword;
		token = body.token;
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON format" },
			{ status: 400 },
		);
	}

	const { success } = userPasswordResetSchema.safeParse({
		newPassword,
		token,
	});

	if (!token || !newPassword || !success) {
		return NextResponse.json(
			{ error: "Valid token and new password are required" },
			{ status: 400 },
		);
	}

	try {
		await prisma.$transaction(async (tx) => {
			await resetPassword(token, newPassword, tx);
			await deletePasswordResetRequest(token, tx);
		});

		return NextResponse.json(
			{ message: "Password reset successful" },
			{ status: 200 },
		);
	} catch (err: unknown) {
		if (err instanceof Error) {
			if (err.message.includes("not found")) {
				return NextResponse.json(
					{ error: "Invalid token" },
					{ status: 404 },
				);
			}

			if (err.message.includes("expired")) {
				return NextResponse.json(
					{ error: "Token expired" },
					{ status: 410 },
				);
			}
		}

		console.error("Unhandled error during password reset:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
