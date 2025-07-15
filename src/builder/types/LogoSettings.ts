import { z } from "zod";

export type LogoSettings = {
	format: "square" | "rectangle";
	url: string;
};

export const LogoSettingsSchema = z.object({
	format: z.enum(["square", "rectangle"]),
	url: z.string().url(),
});
