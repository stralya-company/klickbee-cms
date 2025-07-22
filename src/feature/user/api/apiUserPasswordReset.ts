import { NextRequest, NextResponse } from "next/server";
import { userPasswordResetSchema } from "@/feature/user/types/userPasswordResetSchema";
import resetPassword from "@/feature/user/functions/resetPassword";
import deletePasswordResetRequest from "@/feature/user/functions/deletePasswordResetRequest";
import prisma from "@/lib/prisma";
import { getApiTranslation } from "@/lib/apiTranslation";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const result = userPasswordResetSchema.safeParse(body);

		if (!result.success) {
			const errorMessage = await getApiTranslation(
				"PasswordReset",
				"InvalidFormValidation",
			);
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const { token, newPassword } = result.data;

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
		if (err instanceof SyntaxError) {
			const errorMessage = await getApiTranslation(
				"PasswordReset",
				"InvalidJsonFormat",
			);
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

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
