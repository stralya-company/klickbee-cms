import { NextRequest, NextResponse } from 'next/server'
import { createPasswordResetRequest } from '@/feature/user/functions/createPasswordResetRequest'
import { userPasswordResetRequestSchema } from '@/feature/user/types/userPasswordResetRequestSchema'
import { getApiTranslation } from '@/lib/apiTranslation'

export async function POST(req: NextRequest) {
	let email: string

	try {
		const body = await req.json()
		email = body.email
	} catch {
		const errorMessage = await getApiTranslation(
			'PasswordResetRequest',
			'InvalidJsonFormat',
		)
		return NextResponse.json({ error: errorMessage }, { status: 400 })
	}

	const { success } = userPasswordResetRequestSchema.safeParse({ email })

	if (!email || !success) {
		const errorMessage = await getApiTranslation(
			'PasswordResetRequest',
			'EmailRequired',
		)
		return NextResponse.json({ error: errorMessage }, { status: 400 })
	}

	try {
		await createPasswordResetRequest(email)

		// Todo: Implement email sending logic here

		const successMessage = await getApiTranslation(
			'PasswordResetRequest',
			'Success',
		)
		return NextResponse.json({ message: successMessage }, { status: 200 })
	} catch (err: unknown) {
		if (err instanceof Error) {
			if (err.message.includes('not found')) {
				const errorMessage = await getApiTranslation(
					'PasswordResetRequest',
					'EmailNotFound',
				)
				return NextResponse.json(
					{ error: errorMessage },
					{ status: 404 },
				)
			}
		}

		console.error('Unhandled error during password reset request:', err)
		const errorMessage = await getApiTranslation(
			'PasswordResetRequest',
			'InternalServerError',
		)
		return NextResponse.json({ error: errorMessage }, { status: 500 })
	}
}
