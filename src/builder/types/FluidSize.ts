import { z } from "zod";

export const sizeUnits = ["px", "em", "rem"] as const;
export type SizeUnit = (typeof sizeUnits)[number];

export type FluidSize = {
	min: number; // e.g. "1"
	max: number; // e.g. "2"
	sizeUnit: SizeUnit;
};

export const fluidSizeSchema = z.object({
	min: z.number(),
	max: z.number(),
	sizeUnit: z.enum(sizeUnits),
});
