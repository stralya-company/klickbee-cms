import { POST } from "./route";
import { NextRequest } from "next/server";
import resetPassword from "@/feature/user/functions/resetPassword";
import deletePasswordResetRequest from "@/feature/user/functions/deletePasswordResetRequest";

jest.mock("@/feature/user/functions/resetPassword", () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock("@/feature/user/functions/deletePasswordResetRequest", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockResetPassword = resetPassword as jest.MockedFunction<
	typeof resetPassword
>;
const mockDeletePasswordResetRequest =
	deletePasswordResetRequest as jest.MockedFunction<
		typeof deletePasswordResetRequest
	>;

const VALID_TOKEN = "123e4567-e89b-12d3-a456-426614174000";
const VALID_PASSWORD = "newPassword123!";

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

async function executeTest(req: NextRequest) {
	const res = await POST(req);
	const json = await res.json();
	return { res, json };
}

function expectValidationError(
	res: Response,
	json: { error?: string; message?: string },
) {
	expect(res.status).toBe(400);
	expect(json.error).toBe("Valid token and new password are required");
	expect(mockResetPassword).not.toHaveBeenCalled();
	expect(mockDeletePasswordResetRequest).not.toHaveBeenCalled();
}

function expectServerError(
	res: Response,
	json: { error?: string; message?: string },
) {
	expect(res.status).toBe(500);
	expect(json.error).toBe("Internal server error");
}

describe("POST /api/auth/password-reset", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return 200 for valid token and password", async () => {
		mockResetPassword.mockResolvedValue();
		mockDeletePasswordResetRequest.mockResolvedValue();

		const validToken = "123e4567-e89b-12d3-a456-426614174000";
		const req = createMockRequest({
			token: validToken,
			newPassword: "newPassword123!",
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(200);
		expect(json.message).toBe("Password reset successful");
		expect(mockResetPassword).toHaveBeenCalledWith(
			validToken,
			"newPassword123!",
		);
		expect(mockDeletePasswordResetRequest).toHaveBeenCalledWith(validToken);
	});

	it("should return 400 for invalid JSON", async () => {
		const req = createMockRequestWithError();

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(400);
		expect(json.error).toBe("Invalid JSON format");
		expect(mockResetPassword).not.toHaveBeenCalled();
		expect(mockDeletePasswordResetRequest).not.toHaveBeenCalled();
	});

	it("should return 400 for missing token", async () => {
		const req = createMockRequest({
			newPassword: VALID_PASSWORD,
		});

		const { res, json } = await executeTest(req);
		expectValidationError(res, json);
	});

	it("should return 400 for missing password", async () => {
		const req = createMockRequest({
			token: VALID_TOKEN,
		});

		const { res, json } = await executeTest(req);
		expectValidationError(res, json);
	});

	it("should return 400 for empty token", async () => {
		const req = createMockRequest({
			token: "",
			newPassword: VALID_PASSWORD,
		});

		const { res, json } = await executeTest(req);
		expectValidationError(res, json);
	});

	it("should return 400 for empty password", async () => {
		const req = createMockRequest({
			token: VALID_TOKEN,
			newPassword: "",
		});

		const { res, json } = await executeTest(req);
		expectValidationError(res, json);
	});

	it("should return 404 for invalid token", async () => {
		mockResetPassword.mockRejectedValue(new Error("Token not found"));

		const req = createMockRequest({
			token: VALID_TOKEN,
			newPassword: VALID_PASSWORD,
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(404);
		expect(json.error).toBe("Invalid token");
		expect(mockResetPassword).toHaveBeenCalledWith(
			VALID_TOKEN,
			VALID_PASSWORD,
		);
		expect(mockDeletePasswordResetRequest).not.toHaveBeenCalled();
	});

	it("should return 410 for expired token", async () => {
		mockResetPassword.mockRejectedValue(new Error("Token expired"));

		const req = createMockRequest({
			token: VALID_TOKEN,
			newPassword: VALID_PASSWORD,
		});

		const res = await POST(req);
		const json = await res.json();

		expect(res.status).toBe(410);
		expect(json.error).toBe("Token expired");
		expect(mockResetPassword).toHaveBeenCalledWith(
			VALID_TOKEN,
			VALID_PASSWORD,
		);
		expect(mockDeletePasswordResetRequest).not.toHaveBeenCalled();
	});

	it("should return 500 for unhandled error", async () => {
		mockResetPassword.mockRejectedValue(new Error("Database error"));

		const req = createMockRequest({
			token: VALID_TOKEN,
			newPassword: VALID_PASSWORD,
		});

		const { res, json } = await executeTest(req);
		expectServerError(res, json);
		expect(mockResetPassword).toHaveBeenCalledWith(
			VALID_TOKEN,
			VALID_PASSWORD,
		);
		expect(mockDeletePasswordResetRequest).not.toHaveBeenCalled();
	});

	it("should handle error from deletePasswordResetRequest", async () => {
		mockResetPassword.mockResolvedValue();
		mockDeletePasswordResetRequest.mockRejectedValue(
			new Error("Database error"),
		);

		const req = createMockRequest({
			token: VALID_TOKEN,
			newPassword: VALID_PASSWORD,
		});

		const { res, json } = await executeTest(req);
		expectServerError(res, json);
		expect(mockResetPassword).toHaveBeenCalledWith(
			VALID_TOKEN,
			VALID_PASSWORD,
		);
		expect(mockDeletePasswordResetRequest).toHaveBeenCalledWith(
			VALID_TOKEN,
		);
	});

	it("should handle schema validation failure", async () => {
		const req = createMockRequest({
			token: "invalid-uuid",
			newPassword: "short",
		});

		const { res, json } = await executeTest(req);
		expectValidationError(res, json);
	});
});
