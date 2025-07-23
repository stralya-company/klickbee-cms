import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'
import { POST } from './route'

vi.mock('@stralya/auth')

function createMockRequest(body: object): NextRequest {
	return {
		json: async () => body,
	} as unknown as NextRequest
}

describe('POST /api/register', () => {
	it('should return 201 for successful registration', async () => {
		const req = createMockRequest({
			email: 'new@example.com',
			password: 'strongpassword',
		})

		const res = await POST(req)
		const json = await res.json()

		expect(res.status).toBe(201)
		expect(json.user).toBeDefined()
		expect(json.user.email).toBe('new@example.com')
	})

	it('should return 400 if user already exists', async () => {
		const req = createMockRequest({
			email: 'existing@example.com',
			password: 'any',
		})

		const res = await POST(req)
		const json = await res.json()

		expect(res.status).toBe(400)
		expect(json.error).toBe('User already exists')
	})
})
