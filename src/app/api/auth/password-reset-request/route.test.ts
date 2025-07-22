import {
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	vi,
	type Mock,
} from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";
import { createPasswordResetRequest } from "@/feature/user/functions/createPasswordResetRequest";
import { getApiTranslation } from "@/lib/apiTranslation";
import { sendEmail } from "@/lib/sendEmail";

vi.mock("@/feature/user/functions/createPasswordResetRequest", () => ({
	createPasswordResetRequest: vi.fn(),
}));

vi.mock("@/lib/apiTranslation", () => ({
	getApiTranslation: vi.fn(),
}));

vi.mock("@/lib/sendEmail", () => ({
	sendEmail: vi.fn(),
}));

const mockRequestPasswordReset = createPasswordResetRequest as Mock;
const mockGetApiTranslation = getApiTranslation as Mock;
const mockSendEmail = sendEmail as Mock;

function createMockRequest(body: object): NextRequest {
	return {
		json: async () => body,
	} as unknown as NextRequest;
}

function createMockRequestWithError(): NextRequest {
	return {
		json: async () => {
			throw new SyntaxError("Invalid JSON");
		},
	} as unknown as NextRequest;
}

describe("POST /api/auth/password-reset-request", () => {
	const originalEnv = process.env;

	const setupTranslationMocks = () => {
		const translations: Record<string, Record<string, string>> = {
			Common: {
				InvalidJsonFormat: "Invalid JSON format",
				InternalServerError: "Internal server error",
				MissingAppUrl: "Application URL is not configured",
				MissingAdminKey: "Admin key is not configured",
				EmailSendError: "Failed to send email",
			},
			PasswordResetRequest: {
				Success: "Password reset request successful",
				EmailRequired: "Valid email address is required",
				EmailNotFound: "Email not found",
				EmailSubject: "Password Reset Request",
				EmailContent: "Please use this link to reset your password",
			},
		};
		mockGetApiTranslation.mockImplementation((section, key) =>
			Promise.resolve(translations[section]?.[key] || key),
		);
	};

	beforeEach(() => {
		vi.clearAllMocks();
		setupTranslationMocks();
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_APP_URL: "http://localhost:3000",
			ADMIN_GENERATED_KEY: "test-admin-key-123",
		};
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("should return 200 for valid email", async () => {
		mockRequestPasswordReset.mockResolvedValue("reset-token");
		mockSendEmail.mockResolvedValue(undefined);

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
		expect(mockSendEmail).toHaveBeenCalledWith({
			to: "valid@example.com",
			subject: "Password Reset Request",
			text: "Please use this link to reset your password: http://localhost:3000/admin/test-admin-key-123/auth/password-reset?token=reset-token",
		});
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
