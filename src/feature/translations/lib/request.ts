import { getRequestConfig } from "next-intl/server";
import { getSetting, setSetting } from "@/feature/settings/lib/settings";

export default getRequestConfig(async () => {
	let locale = await getSetting("system_lang");
	if (!locale) {
		locale = "en";
		await setSetting("system_lang", locale);
	}
	return {
		locale,
		messages: (await import(`../../translations/${locale}.json`)).default,
	};
});
