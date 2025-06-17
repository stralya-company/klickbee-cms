import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_GENERATED_KEY || "admin";
const AUTH_COOKIE_NAME = "session";

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const response = NextResponse.next();

	const match = pathname.match(/^\/admin\/([^/]+)/);
	if (!match) return response;

	const key = match[1];

	if (key !== ADMIN_KEY) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	const isLoginPage = pathname.startsWith(`/admin/${ADMIN_KEY}/auth/login`);
	const isAuthenticated = Boolean(req.cookies.get(AUTH_COOKIE_NAME));

	if (!isAuthenticated && !isLoginPage) {
		return NextResponse.redirect(
			new URL(`/admin/${ADMIN_KEY}/auth/login`, req.url),
		);
	}

	return response;
}

export const config = {
	matcher: ["/:path*", "/admin/:adminKey/:path*"],
};
