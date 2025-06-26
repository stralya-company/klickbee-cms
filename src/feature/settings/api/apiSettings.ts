import { NextRequest, NextResponse } from "next/server";
import { getSetting, setUserSetting, setSetting } from "@/lib/settings";
import { isAuthenticatedGuard } from "@stralya/auth";

export async function GET(req: NextRequest) {
	// Vérification de l'authentification
	const authError = await isAuthenticatedGuard(req);
	if (authError) {
		return authError;
	}
	const { searchParams } = new URL(req.url);
	const key = searchParams.get("key");
	const userId = searchParams.get("userId");

	if (!key) {
		return NextResponse.json({ error: "key manquant" }, { status: 400 });
	}

	const value = await getSetting(key, userId);
	return NextResponse.json({ value });
}

export async function POST(req: NextRequest) {
	// Vérification de l'authentification
	const authError = await isAuthenticatedGuard(req);
	if (authError) {
		return authError;
	}
	const body = await req.json();
	const { key, value, userId } = body;

	if (!key || !value) {
		return NextResponse.json(
			{ error: "key ou value manquant" },
			{ status: 400 },
		);
	}

	if (userId) {
		await setUserSetting(key, value, userId);
	} else {
		await setSetting(key, value);
	}

	return NextResponse.json({ success: true });
}
