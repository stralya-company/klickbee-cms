import { z } from "zod";
import {
	FluidSize,
	fluidSizeSchema,
	SizeUnit,
} from "@/builder/types/FluidSize";

export type TypographySettings = {
	fontFamily: string;
	fontSize: FluidSize;
	lineHeight: number;
	lineHeightUnits: SizeUnit;
	fontWeight: string | number;
	fontStyle: string;
	letterSpacingUnits: SizeUnit;
	letterSpacing: number;
	[key: string]: string | FluidSize | number; // Allow additional properties
};

export const typographySettingsSchema = z
	.object({
		fontFamily: z.string(),
		fontSize: fluidSizeSchema,
		lineHeight: z.number(),
		lineHeightUnits: z.enum(["px", "em", "rem"]), // Default to "px" if not provided
		fontWeight: z.string().or(z.number()), // Default to "400" if not provided
		fontStyle: z.string(),
		letterSpacing: z.number(),
		letterSpacingUnits: z.enum(["px", "em", "rem"]),
	})
	.catchall(z.union([z.string(), fluidSizeSchema, z.number()]));
