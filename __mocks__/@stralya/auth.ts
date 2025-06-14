export const login = jest.fn((email: string, password: string) => {
	if (email === "valid@example.com" && password === "validpassword") {
		return Promise.resolve({ token: "mock-token" });
	}
	return Promise.resolve(null);
});

export const register = jest.fn((email: string, password: string) => {
	if (email === "new@example.com" && password === "strongpassword") {
		return Promise.resolve({ id: "123", email });
	}
	throw new Error("User already exists");
});

export const setPrismaClient = jest.fn();
