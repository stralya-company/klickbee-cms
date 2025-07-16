import {
	SpacingSettings,
	spacingSettingsSchema,
} from "@/builder/types/SpacingSettings";
import {
	FluidTypographySettings,
	fluidTypographySettingsSchema,
} from "@/builder/types/TypographySettings";
import { colorSchema, ColorSettings } from "@/builder/types/ColorSettings";
import { z } from "zod";
import { LogoSettings, logoSettingsSchema } from "@/builder/types/LogoSettings";

export type GlobalSettingsData = {
	typography: FluidTypographySettings;
	colors: ColorSettings[];
	spacing: SpacingSettings;
	logos: LogoSettings[];
};

export const globalSettingsSchema = z.object({
	typography: fluidTypographySettingsSchema,
	colors: colorSchema.array(),
	spacing: spacingSettingsSchema,
	logos: logoSettingsSchema.array(),
});
