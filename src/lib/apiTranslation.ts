import { getSetting } from "@/lib/settings";

interface ApiTranslations {
	API: {
		PasswordResetRequest: {
			Success: string;
			InvalidJsonFormat: string;
			EmailRequired: string;
			EmailNotFound: string;
			InternalServerError: string;
		};
		PasswordReset: {
			Success: string;
			InvalidJsonFormat: string;
			TokenAndPasswordRequired: string;
			InvalidToken: string;
			TokenExpired: string;
			InternalServerError: string;
		};
	};
}

export async function getApiTranslation(
	section: keyof ApiTranslations["API"],
	key: string,
): Promise<string> {
	try {
		const locale = (await getSetting("system_lang")) || "en";
		const translations: ApiTranslations = await import(
			`../../translations/${locale}.json`
		);
		
		return translations.API[section][key as keyof typeof translations.API[typeof section]] || key;
	} catch {
		// Fallback to English if translation fails
		const fallbackTranslations: ApiTranslations = await import(
			`../../translations/en.json`
		);
		return fallbackTranslations.API[section][key as keyof typeof fallbackTranslations.API[typeof section]] || key;
	}
}