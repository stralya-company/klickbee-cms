import { vi } from "vitest";

export const login = vi.fn((email: string, password: string) => {
	if (email === "valid@example.com" && password === "validpassword") {
		return Promise.resolve({ token: "mock-token" });
	}
	return Promise.resolve(null);
});

export const register = vi.fn((email: string, password: string) => {
	if (email === "new@example.com" && password === "strongpassword") {
		return Promise.resolve({ email, id: "123" });
	}
	throw new Error("User already exists");
});

export const setPrismaClient = vi.fn();
