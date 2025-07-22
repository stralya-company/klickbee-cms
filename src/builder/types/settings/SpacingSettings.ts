import { z } from "zod";
import { FluidSize, fluidSizeSchema } from "@/builder/types/settings/FluidSize";

export type SectionPadding = {
	top: FluidSize;
	right: FluidSize;
	left: FluidSize;
	bottom: FluidSize;
	key: string /* To retrieve easily  */;
};
export type SectionGap = {
	row: FluidSize;
	column: FluidSize;
	key: string /* To retrieve easily  */;
};

export type SpacingSettings = {
	sectionPadding: SectionPadding[];
	gap: SectionGap[];
	maxWidth: number /* In pixels */;
};

export const sectionPaddingSchema = z.object({
	top: fluidSizeSchema,
	right: fluidSizeSchema,
	left: fluidSizeSchema,
	bottom: fluidSizeSchema,
	key: z.string().min(1, "Key is required"),
});

export const gapSchema = z.object({
	row: fluidSizeSchema,
	column: fluidSizeSchema,
	key: z.string().min(1, "Key is required"),
});

export const spacingSettingsSchema = z.object({
	sectionPadding: sectionPaddingSchema.array(),
	gap: gapSchema.array(),
	maxWidth: z.number(),
});

export const defaultSpacingSettings: SpacingSettings = {
	sectionPadding: [
		{
			top: { min: 1, max: 2, sizeUnit: "rem" },
			right: { min: 1, max: 2, sizeUnit: "rem" },
			left: { min: 1, max: 2, sizeUnit: "rem" },
			bottom: { min: 1, max: 2, sizeUnit: "rem" },
			key: "default-padding",
		},
	],
	gap: [
		{
			row: { min: 0.5, max: 1, sizeUnit: "rem" },
			column: { min: 0.5, max: 1, sizeUnit: "rem" },
			key: "default-gap",
		},
	],
	maxWidth: 1440,
};
