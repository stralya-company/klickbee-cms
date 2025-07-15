import {
	SpacingSettings,
	spacingSettingsSchema,
} from "@/builder/types/SpacingSettings";
import {
	TypographySettings,
	typographySettingsSchema,
} from "@/builder/types/TypographySettings";
import { colorSchema, ColorSettings } from "@/builder/types/ColorSettings";
import { z } from "zod";
import { LogoSettingsSchema } from "@/builder/types/LogoSettings";

export type GlobalSettingsData = {
	typographies: TypographySettings[];
	colors: ColorSettings[];
	spacings: SpacingSettings[];
};

export const globalSettingsSchema = z.object({
	typography: typographySettingsSchema.array(),
	colors: colorSchema.array(),
	spacing: spacingSettingsSchema.array(),
	logos: LogoSettingsSchema.array(),
});
