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
import {
	colorSchema,
	ColorSettings,
	defaultColorSettings,
} from "@/builder/types/settings/ColorSettings";
import { z } from "zod";
import {
	defaultLogoSettings,
	LogoSettings,
	logoSettingsSchema,
} from "@/builder/types/settings/LogoSettings";

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

export const defaultGlobalSettings: GlobalSettingsData = {
	typography: defaultFluidTypographySettings,
	colors: defaultColorSettings,
	spacing: defaultSpacingSettings,
	logos: defaultLogoSettings,
};
