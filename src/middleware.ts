import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_GENERATED_KEY || "admin";
const AUTH_COOKIE_NAME = "session";

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const match = pathname.match(/^\/admin_([^/]+)/);
	if (!match) return NextResponse.next();

	const key = match[1];
	if (key !== ADMIN_KEY) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	const isLoginPage = pathname.startsWith(`/admin_${ADMIN_KEY}/auth/login`);
	const isAuthenticated = Boolean(req.cookies.get(AUTH_COOKIE_NAME));

	// 🚫 Redirect only if NOT on login page AND not authenticated
	if (!isAuthenticated && !isLoginPage) {
		return NextResponse.redirect(
			new URL(`/admin_${ADMIN_KEY}/auth/login`, req.url),
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
