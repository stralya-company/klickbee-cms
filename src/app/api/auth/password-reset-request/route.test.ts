import { POST } from "./route";
import { NextRequest } from "next/server";
import { createPasswordResetRequest } from "@/feature/user/functions/createPasswordResetRequest";

jest.mock("@/feature/user/functions/createPasswordResetRequest", () => ({
	createPasswordResetRequest: jest.fn(),
}));

const mockRequestPasswordReset =
	createPasswordResetRequest as jest.MockedFunction<
		typeof createPasswordResetRequest
	>;

function createMockRequest(body: object): NextRequest {
	return {
		json: async () => body,
	} as unknown as NextRequest;
}

function createMockRequestWithError(): NextRequest {
	return {
		json: async () => {
			throw new Error("Invalid JSON");
		},
	} as unknown as NextRequest;
}

describe("POST /api/auth/password-reset-request", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return 200 for valid email", async () => {
		mockRequestPasswordReset.mockResolvedValue("reset-token");

		const req = createMockRequest({
			email: "valid@example.com",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(200);
		expect(json.message).toBe("Password reset request successful");
		expect(mockRequestPasswordReset).toHaveBeenCalledWith(
			"valid@example.com",
		);
	});

	it("should return 400 for invalid JSON", async () => {
		const req = createMockRequestWithError();

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(400);
		expect(json.error).toBe("Invalid JSON format");
		expect(mockRequestPasswordReset).not.toHaveBeenCalled();
	});

	it("should return 400 for missing email", async () => {
		const req = createMockRequest({});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(400);
		expect(json.error).toBe("Valid email address is required");
		expect(mockRequestPasswordReset).not.toHaveBeenCalled();
	});

	it("should return 400 for invalid email format", async () => {
		const req = createMockRequest({
			email: "invalid-email",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(400);
		expect(json.error).toBe("Valid email address is required");
		expect(mockRequestPasswordReset).not.toHaveBeenCalled();
	});

	it("should return 404 for email not found", async () => {
		mockRequestPasswordReset.mockRejectedValue(new Error("User not found"));

		const req = createMockRequest({
			email: "notfound@example.com",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(404);
		expect(json.error).toBe("Email not found");
		expect(mockRequestPasswordReset).toHaveBeenCalledWith(
			"notfound@example.com",
		);
	});

	it("should return 500 for server error", async () => {
		mockRequestPasswordReset.mockRejectedValue(new Error("Database error"));

		const req = createMockRequest({
			email: "valid@example.com",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(500);
		expect(json.error).toBe("Internal server error");
		expect(mockRequestPasswordReset).toHaveBeenCalledWith(
			"valid@example.com",
		);
	});
});
