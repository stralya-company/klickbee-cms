export const fallbackLng = "en";
export const languages = [fallbackLng, "fr"];
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
	return {
		supportedLngs: languages,
		fallbackLng,
		lng,
		ns,
		defaultNS,
		fallbackNS: defaultNS,
		interpolation: {
			escapeValue: false,
		},
	};
}
