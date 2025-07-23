import { NextRequest, NextResponse } from "next/server";
import deletePasswordResetRequest from "@/feature/user/functions/deletePasswordResetRequest";
import resetPassword from "@/feature/user/functions/resetPassword";
import { userPasswordResetSchema } from "@/feature/user/types/userPasswordResetSchema";
import { getApiTranslation } from "@/lib/apiTranslation";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
	let token: string;
	let newPassword: string;

	try {
		const body = await req.json();
		newPassword = body.newPassword;
		token = body.token;
	} catch {
		const errorMessage = await getApiTranslation(
			"PasswordReset",
			"InvalidJsonFormat",
		);
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}

	const { success } = userPasswordResetSchema.safeParse({
		newPassword,
		token,
	});

	if (!token || !newPassword || !success) {
		const errorMessage = await getApiTranslation(
			"PasswordReset",
			"TokenAndPasswordRequired",
		);
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}

	try {
		await prisma.$transaction(async (tx) => {
			await resetPassword(token, newPassword, tx);
			await deletePasswordResetRequest(token, tx);
		});

		const successMessage = await getApiTranslation(
			"PasswordReset",
			"Success",
		);
		return NextResponse.json({ message: successMessage }, { status: 200 });
	} catch (err: unknown) {
		if (err instanceof Error) {
			if (err.message.includes("not found")) {
				const errorMessage = await getApiTranslation(
					"PasswordReset",
					"InvalidToken",
				);
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 404 },
				);
			}

			if (err.message.includes("expired")) {
				const errorMessage = await getApiTranslation(
					"PasswordReset",
					"TokenExpired",
				);
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 410 },
				);
			}
		}

		console.error("Unhandled error during password reset:", err);
		const errorMessage = await getApiTranslation(
			"PasswordReset",
			"InternalServerError",
		);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
