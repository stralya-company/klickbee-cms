import { z } from "zod";

export const logoFormats = ["square", "rectangle"] as const;
export type LogoFormat = (typeof logoFormats)[number];

export type LogoSettings = {
	format: LogoFormat;
	url: string;
};

export const logoSettingsSchema = z.object({
	format: z.enum(logoFormats),
	url: z.string().url(),
});
