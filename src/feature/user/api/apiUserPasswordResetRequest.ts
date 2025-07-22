import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetRequest } from "@/feature/user/functions/createPasswordResetRequest";
import { userPasswordResetRequestSchema } from "@/feature/user/types/userPasswordResetRequestSchema";
import { getApiTranslation } from "@/lib/apiTranslation";

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

		await createPasswordResetRequest(email);

		// Todo: Implement email sending logic here

		const successMessage = await getApiTranslation(
			"PasswordResetRequest",
			"Success",
		);
		return NextResponse.json({ message: successMessage }, { status: 200 });
	} catch (err: unknown) {
		if (err instanceof SyntaxError) {
			const errorMessage = await getApiTranslation(
				"PasswordResetRequest",
				"InvalidJsonFormat",
			);
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		if (err instanceof Error) {
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
		}

		console.error("Unhandled error during password reset request:", err);
		const errorMessage = await getApiTranslation(
			"PasswordResetRequest",
			"InternalServerError",
		);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
