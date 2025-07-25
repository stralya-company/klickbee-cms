import { getSetting } from "@/feature/settings/lib/settings";

interface ApiTranslations {
	API: {
		[key: string]: {
			[key: string]: string;
		};
	};
}

export async function getTranslationApi(
	section: keyof ApiTranslations["API"],
	key: string,
): Promise<string> {
	try {
		const locale = (await getSetting("system_lang")) || "en";
		const translations: ApiTranslations = await import(
			`./../languages/${locale}.json`
		);

		return (
			translations.API[section][
				key as keyof (typeof translations.API)[typeof section]
			] || key
		);
	} catch {
		// Fallback to English if translation fails
		const fallbackTranslations: ApiTranslations = await import(
			`./../languages/en.json`
		);
		return (
			fallbackTranslations.API[section][
				key as keyof (typeof fallbackTranslations.API)[typeof section]
			] || key
		);
	}
}
