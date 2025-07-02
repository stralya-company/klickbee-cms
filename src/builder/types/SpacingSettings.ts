import { z } from "zod";
import {
	FluidSize,
	fluidSizeSchema,
	SizeUnit,
} from "@/builder/types/FluidSize";

export type SectionPadding = {
	top: FluidSize;
	right: FluidSize;
	left: FluidSize;
	bottom: FluidSize;
};

export type SpacingSettings = {
	sectionPadding: {
		[key: string]: SectionPadding; // ex: default, small, large, etc.
	};
	gap: {
		[key: string]: { row: FluidSize; column: FluidSize }; // idem
	};
	maxWidth: number;
	widthUnit: SizeUnit; // Optional, e.g. "px", "em", "rem"
};

export const sectionPaddingSchema = z.object({
	top: fluidSizeSchema,
	right: fluidSizeSchema,
	left: fluidSizeSchema,
	bottom: fluidSizeSchema,
});

export const gapSchema = z.object({
	row: fluidSizeSchema,
	column: fluidSizeSchema,
});

export const spacingSettingsSchema = z.object({
	key: z.string(),
	sectionPadding: z
		.record(sectionPaddingSchema)
		.refine((obj) => "default" in obj, {
			message: "La clé 'default' est requise dans sectionPadding.",
		}),
	gap: z.record(gapSchema).refine((obj) => "default" in obj, {
		message: "La clé 'default' est requise dans gap.",
	}),
	maxWidth: z.number(),
	widthUnit: z.enum(["px", "em", "rem"]),
});
