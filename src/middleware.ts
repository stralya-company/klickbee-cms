import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_GENERATED_KEY || "admin";
const AUTH_COOKIE_NAME = "session";

const locales = ["en-US", "fr-FR"];
const defaultLocale = "fr-FR";

function parseAcceptLanguage(header: string | null) {
	if (!header) return [];
	return header.split(",").map((part) => part.split(";")[0].trim());
}

function getLocale(req: NextRequest) {
	const acceptLanguage = req.headers.get("accept-language");
	const languages = parseAcceptLanguage(acceptLanguage);
	for (const lang of languages) {
		const found = locales.find(
			(locale) =>
				locale === lang ||
				locale.startsWith(lang) ||
				lang.startsWith(locale),
		);
		if (found) return found;
	}
	return defaultLocale;
}

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Détection de la locale
	const locale = getLocale(req);

	// Création de la réponse
	const response = NextResponse.next();
	response.cookies.set("lang", locale, { path: "/" });

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
