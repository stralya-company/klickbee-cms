"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	GlobalSettingsData,
	globalSettingsSchema,
} from "@/builder/types/GlobalSettingsData";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import TypographyEditor from "@/builder/components/settings/TypographyEditor";
// import ColorPaletteEditor from "@/builder/components/settings/ColorEditor";
// import SpacingEditor from "@/builder/components/settings/SpacingEditor";
import SpacingPreview from "@/builder/components/settings/SpacingPreview";
import ColorPreview from "@/builder/components/settings/ColorPreview";
import TypographyPreview from "@/builder/components/settings/TypographyPreview";
import LogoEditor from "@/builder/components/settings/LogoEditor";
import { defaultFluidTypographySettings } from "@/builder/types/TypographySettings";
import { defaultColorSettings } from "@/builder/types/ColorSettings";
import { defaultSpacingSettings } from "@/builder/types/SpacingSettings";
import { defaultLogoSettings } from "@/builder/types/LogoSettings";

export type FormValues = z.output<typeof globalSettingsSchema>;

const defaultValues: FormValues = {
	logos: defaultLogoSettings,
	typography: defaultFluidTypographySettings,
	colors: defaultColorSettings,
	spacing: defaultSpacingSettings,
} as GlobalSettingsData;

export default function AdminBuilderSettingsPage() {
	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(globalSettingsSchema),
		defaultValues,
		mode: "onChange",
	});
	// Gestion des erreurs
	if (Object.keys(errors).length > 0) {
		console.error("Form errors:", errors);
	}

	// // Couleurs dynamiques
	// const {
	// 	fields: colorFields,
	// 	append: appendColor,
	// 	remove: removeColor,
	// } = useFieldArray({
	// 	control,
	// 	name: "colors",
	// });

	// Spacing dynamique
	// const {
	// 	fields: spacingFields,
	// 	append: appendSpacing,
	// 	remove: removeSpacing,
	// } = useFieldArray({
	// 	control,
	// 	name: "spacing",
	// });

	const watched = watch();
	const typography = watched.typography;
	const spacing = watched.spacing;
	const colors = watched.colors;

	return (
		<div className="">
			<form className="space-y-6" onSubmit={handleSubmit(() => {})}>
				<div className="grid grid-cols-2 gap-4 items-start">
					<TypographyEditor
						register={register}
						setValue={setValue}
						control={control}
						watch={watch}
					/>
					<TypographyPreview typography={typography} />
				</div>

				<div className="grid grid-cols-2 gap-4 items-start">
					{/*<ColorPaletteEditor*/}
					{/*	colorFields={colorFields}*/}
					{/*	register={register}*/}
					{/*	removeColor={removeColor}*/}
					{/*	appendColor={appendColor}*/}
					{/*/>*/}
					<ColorPreview colors={colors} />
				</div>

				<div className="grid grid-cols-2 gap-4 items-start">
					{/*<SpacingEditor*/}
					{/*	spacingFields={spacingFields}*/}
					{/*	register={register}*/}
					{/*	removeSpacing={removeSpacing}*/}
					{/*	appendSpacing={appendSpacing}*/}
					{/*	watch={watch}*/}
					{/*	setValue={setValue}*/}
					{/*/>*/}
					<SpacingPreview spacing={spacing} />
				</div>
				<div className="grid grid-cols-2 gap-4 items-start">
					<LogoEditor
						logos={watched.logos}
						onChange={(logos) => setValue("logos", logos)}
					/>
				</div>
				<Button type="submit">Sauvegarder</Button>
			</form>
			{/*<PreviewPanel typography={typography} colors={colors} spacing={spacing} />*/}
		</div>
	);
}
