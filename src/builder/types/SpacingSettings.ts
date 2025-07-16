import { z } from "zod";
import {
	FluidSize,
	fluidSizeSchema,
	SizeUnit,
	sizeUnits,
} from "@/builder/types/FluidSize";

export type SectionPadding = {
	top: FluidSize;
	right: FluidSize;
	left: FluidSize;
	bottom: FluidSize;
	maxWidth: number;
	widthUnit: SizeUnit;
};
export type SectionGap = {
	row: FluidSize;
	column: FluidSize;
	maxWidth: number;
	widthUnit: SizeUnit;
};

export type SpacingSettings = {
	sectionPadding: {
		[key: string]: SectionPadding; // ex: default, small, large, etc.
	};
	gap: {
		[key: string]: SectionGap; // idem
	};
	maxWidth: number;
	widthUnit: SizeUnit; // Optional, e.g. "px", "em", "rem"
};

export const sectionPaddingSchema = z.object({
	top: fluidSizeSchema,
	right: fluidSizeSchema,
	left: fluidSizeSchema,
	bottom: fluidSizeSchema,
	maxWidth: z.number(),
	widthUnit: z.enum(sizeUnits),
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

export const defaultSpacingSettings: SpacingSettings = {
	sectionPadding: {
		default: {
			maxWidth: 1440,
			widthUnit: "px",
			top: { min: 1, max: 2, sizeUnit: "rem" },
			right: { min: 1, max: 2, sizeUnit: "rem" },
			left: { min: 1, max: 2, sizeUnit: "rem" },
			bottom: { min: 1, max: 2, sizeUnit: "rem" },
		},
	},
	gap: {
		default: {
			maxWidth: 1440,
			widthUnit: "px",
			row: { min: 0.5, max: 1, sizeUnit: "rem" },
			column: { min: 0.5, max: 1, sizeUnit: "rem" },
		},
	},
	maxWidth: 1440,
	widthUnit: "px",
};
