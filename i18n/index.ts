import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18n = async (lng: string, ns?: string | undefined) => {
	const i18nInstance = createInstance();

	await i18nInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) =>
					import(`../public/locales/${language}/${namespace}.json`),
			),
		)
		.init(getOptions(lng, ns));

	return i18nInstance;
};

export default initI18n;
