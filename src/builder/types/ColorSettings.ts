import { z } from "zod";

export type ColorSettings = {
	hexCode: string; // e.g. "#ff5733"
	name: string; // e.g. "Primary Red"
};

export const colorSchema = z.object({
	hexCode: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Hex invalide"),
	name: z.string(),
});
