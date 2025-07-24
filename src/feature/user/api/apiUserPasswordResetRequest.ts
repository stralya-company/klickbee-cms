import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetRequest } from "@/feature/user/functions/createPasswordResetRequest";
import { userPasswordResetRequestSchema } from "@/feature/user/types/userPasswordResetRequestSchema";
import { getApiTranslation } from "@/lib/apiTranslation";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const result = userPasswordResetRequestSchema.safeParse(body);

		if (!result.success) {
			const errorMessage = await getApiTranslation(
				"PasswordResetRequest",
				"EmailRequired",
			);
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const { email } = result.data;

		const resetToken = await createPasswordResetRequest(email);

		const baseUrl = (() => {
			if (
				process.env.NODE_ENV === "production" &&
				!process.env.NEXT_PUBLIC_APP_URL
			) {
				throw new Error("MISSING_APP_URL");
			}
			return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
		})();

		const adminKey = process.env.ADMIN_GENERATED_KEY;
		if (!adminKey) {
			throw new Error("MISSING_ADMIN_KEY");
		}

		const resetUrl = `${baseUrl}/admin/${adminKey}/auth/password-reset?token=${resetToken}`;

		const emailSubject = await getApiTranslation(
			"PasswordResetRequest",
			"EmailSubject",
		);
		const emailContent = await getApiTranslation(
			"PasswordResetRequest",
			"EmailContent",
		);

		await sendEmail({
			subject: emailSubject,
			text: `${emailContent}: ${resetUrl}`,
			to: email,
		});

		const successMessage = await getApiTranslation(
			"PasswordResetRequest",
			"Success",
		);
		return NextResponse.json({ message: successMessage }, { status: 200 });
	} catch (err: unknown) {
		if (err instanceof SyntaxError) {
			const errorMessage = await getApiTranslation(
				"Common",
				"InvalidJsonFormat",
			);
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		if (err instanceof Error) {
			// Handle user not found errors
			if (err.message.includes("not found")) {
				const errorMessage = await getApiTranslation(
					"PasswordResetRequest",
					"EmailNotFound",
				);
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 404 },
				);
			}

			// Handle configuration errors
			if (err.message === "MISSING_APP_URL") {
				const errorMessage = await getApiTranslation(
					"Common",
					"MissingAppUrl",
				);
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 500 },
				);
			}

			if (err.message === "MISSING_ADMIN_KEY") {
				const errorMessage = await getApiTranslation(
					"Common",
					"MissingAdminKey",
				);
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 500 },
				);
			}

			// Handle email sending errors
			if (err.message.includes("SMTP") || err.message.includes("mail")) {
				const errorMessage = await getApiTranslation(
					"Common",
					"EmailSendError",
				);
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 500 },
				);
			}
		}

		console.error("Unhandled error during password reset request:", err);
		const errorMessage = await getApiTranslation(
			"Common",
			"InternalServerError",
		);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
