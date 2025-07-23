import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

vi.mock("@stralya/auth");

function createMockRequest(body: object): NextRequest {
	return {
		json: async () => body,
	} as unknown as NextRequest;
}

describe("POST /api/login", () => {
	it("should return 200 for valid credentials", async () => {
		const req = createMockRequest({
			email: "valid@example.com",
			password: "validpassword",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(200);
		expect(json.data).toBeDefined();
	});

	it("should return 401 for invalid credentials", async () => {
		const req = createMockRequest({
			email: "invalid@example.com",
			password: "wrong",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(401);
		expect(json.error).toBe("Invalid credentials");
	});
});
