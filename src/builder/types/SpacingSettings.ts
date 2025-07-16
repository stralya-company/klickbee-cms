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
export type SectionGap = {
	row: FluidSize;
	column: FluidSize;
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
});

export const gapSchema = z.object({
	row: fluidSizeSchema,
	column: fluidSizeSchema,
});

export const spacingSettingsSchema = z.object({
	sectionPadding: z.record(sectionPaddingSchema),
	gap: z.record(gapSchema),
	maxWidth: z.number(),
	widthUnit: z.enum(["px", "em", "rem"]),
});

export const defaultSpacingSettings: SpacingSettings = {
	sectionPadding: {
		default: {
			top: { min: 1, max: 2, sizeUnit: "rem" },
			right: { min: 1, max: 2, sizeUnit: "rem" },
			left: { min: 1, max: 2, sizeUnit: "rem" },
			bottom: { min: 1, max: 2, sizeUnit: "rem" },
		},
	},
	gap: {
		default: {
			row: { min: 0.5, max: 1, sizeUnit: "rem" },
			column: { min: 0.5, max: 1, sizeUnit: "rem" },
		},
	},
	maxWidth: 1440,
	widthUnit: "px",
};
