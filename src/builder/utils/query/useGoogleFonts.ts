import { useQuery } from "@tanstack/react-query";

const fetchGoogleFonts = async (): Promise<
	{ label: string; value: string }[]
> => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONT_API_KEY;
	if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_FONT_API_KEY non définie");

	const res = await fetch(
		`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`,
	);
	if (!res.ok)
		throw new Error("Erreur lors de la récupération des Google Fonts");
	const data = await res.json();
	return data.items.map((font: { family: string }) => ({
		label: font.family,
		value: font.family,
	}));
};

export function useGoogleFonts() {
	return useQuery({
		queryKey: ["google-fonts"],
		queryFn: fetchGoogleFonts,
		staleTime: 1000 * 60 * 60, // 1h
	});
}
