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

export type GlobalSettingsData = {
	typographies: TypographySettings[];
	colors: ColorSettings[];
	spacings: SpacingSettings[];
};

export const globalSettingsSchema = z.object({
	typography: typographySettingsSchema.array(),
	colors: colorSchema.array(),
	spacing: spacingSettingsSchema.array(),
});
