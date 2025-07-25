import { z } from "zod";
import {
	ColorSettings,
	colorSchema,
	defaultColorSettings,
} from "@/builder/types/settings/ColorSettings";
import {
	defaultLogoSettings,
	LogoSettings,
	logoSettingsSchema,
} from "@/builder/types/settings/LogoSettings";
import {
	defaultSpacingSettings,
	SpacingSettings,
	spacingSettingsSchema,
} from "@/builder/types/settings/SpacingSettings";
import {
	defaultFluidTypographySettings,
	FluidTypographySettings,
	fluidTypographySettingsSchema,
} from "@/builder/types/settings/TypographySettings";

export type GlobalSettingsData = {
	typography: FluidTypographySettings;
	colors: ColorSettings[];
	spacing: SpacingSettings;
	logos: LogoSettings[];
};

export const globalSettingsSchema = z.object({
	colors: colorSchema.array(),
	logos: logoSettingsSchema.array(),
	spacing: spacingSettingsSchema,
	typography: fluidTypographySettingsSchema,
});

export const defaultGlobalSettings: GlobalSettingsData = {
	colors: defaultColorSettings,
	logos: defaultLogoSettings,
	spacing: defaultSpacingSettings,
	typography: defaultFluidTypographySettings,
};
