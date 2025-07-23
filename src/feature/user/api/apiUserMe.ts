import { me } from '@stralya/auth'
import { NextResponse } from 'next/server'
import '../../../lib/initSetPrismaClient'

export async function GET() {
	try {
		const user = await me()
		if (!user || !user?.id) {
			return NextResponse.json(
				{ error: 'User not authenticated' },
				{ status: 401 },
			)
		}
		return NextResponse.json({ user }, { status: 200 })
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'An unknown error occurred'
		return NextResponse.json({ error: message }, { status: 401 })
	}
}
