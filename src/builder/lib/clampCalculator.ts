import { FluidSize } from "@/builder/types/FluidSize";

export function toClamp(
	size: FluidSize,
	globalMaxWidth: string = "1440px",
): string {
	const min = size.min;
	const max = size.max;
	const maxWidth = size.maxWidth || parseFloat(globalMaxWidth);
	const sizeUnit = size.sizeUnit;

	// Récupère la taille de police racine si rem
	let slope: number;
	if (sizeUnit === "rem" && typeof window !== "undefined") {
		const rootFontSize =
			parseFloat(getComputedStyle(document.documentElement).fontSize) ||
			16;
		slope = max / (maxWidth / rootFontSize);
	} else {
		slope = max / maxWidth;
	}

	return `clamp(${min}${sizeUnit}, ${(slope * 100).toFixed(4)}vw, ${max}${sizeUnit})`;
}
