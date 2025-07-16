import { z } from "zod";
import {
	FluidSize,
	fluidSizeSchema,
	SizeUnit,
} from "@/builder/types/FluidSize";

export const typographyFontStyles = [
	"normal",
	"italic",
	"oblique",
	"uppercase",
	"lowercase",
	"capitalize",
] as const;
export type TypographyFontStyle = (typeof typographyFontStyles)[number];

export const typographyFontWeights = [
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900",
	"normal",
	"bold",
	"bolder",
] as const;

export type TypographyFontWeight = (typeof typographyFontWeights)[number];

export const typographyUsages = [
	"body",
	"heading",
	"subheading",
	"caption",
	"button",
	"link",
] as const;

export type TypographyUsage = (typeof typographyUsages)[number];

export type TypographySettings = {
	key: string;
	fontFamily: string;
	fontSize: FluidSize;
	lineHeight: number;
	lineHeightUnits: SizeUnit;
	fontWeight: TypographyFontWeight;
	fontStyle: TypographyFontStyle;
	letterSpacingUnits: SizeUnit;
	letterSpacing: number;
	typographyUsage?: TypographyUsage; // Optional, e.g. "body", "heading", etc.
	[key: string]: string | FluidSize | number | undefined; // Allow additional properties
};

export type FluidTypographySettings = {
	maxWidth: number;
	widthUnit: SizeUnit;
	typographies: TypographySettings[];
};

export const typographySettingsSchema = z
	.object({
		key: z.string(),
		fontFamily: z.string(),
		fontSize: fluidSizeSchema,
		lineHeight: z.number(),
		lineHeightUnits: z.enum(["px", "em", "rem"]),
		fontWeight: z.string().or(z.number()),
		fontStyle: z.string(),
		letterSpacing: z.number(),
		letterSpacingUnits: z.enum(["px", "em", "rem"]),
		typographyUsage: z.enum(typographyUsages).optional(),
	})
	.catchall(z.union([z.string(), fluidSizeSchema, z.number()]));

export const fluidTypographySettingsSchema = z.object({
	maxWidth: z.number(),
	widthUnit: z.enum(["px", "em", "rem"]),
	typographies: z.array(typographySettingsSchema),
});

export const defaultFluidTypographySettings: FluidTypographySettings = {
	maxWidth: 1440,
	widthUnit: "px",
	typographies: [
		{
			key: "Heading 1",
			fontFamily: "Inter",
			fontSize: { min: 2, max: 3, sizeUnit: "rem" },
			lineHeight: 1.5,
			lineHeightUnits: "rem",
			fontWeight: "400",
			fontStyle: "normal",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			typographyUsage: "heading",
		},
		{
			key: "Body 1",
			fontFamily: "Poppins",
			fontSize: { min: 1, max: 1.5, sizeUnit: "rem" },
			lineHeight: 1.5,
			lineHeightUnits: "rem",
			fontWeight: "400",
			fontStyle: "normal",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			typographyUsage: "body",
		},
	],
};
