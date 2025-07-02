"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { globalSettingsSchema } from "@/builder/types/GlobalSettingsData";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import TypographyEditor from "@/builder/components/settings/TypographyEditor";
import ColorPaletteEditor from "@/builder/components/settings/ColorEditor";
import SpacingEditor from "@/builder/components/settings/SpacingEditor";
import SpacingPreview from "@/builder/components/settings/SpacingPreview";
import ColorPreview from "@/builder/components/settings/ColorPreview";
import TypographyPreview from "@/builder/components/settings/TypographyPreview";

export type FormValues = z.output<typeof globalSettingsSchema>;

const defaultValues: FormValues = {
	typography: [
		{
			key: "Primary",
			fontFamily: "Arial, sans-serif",
			fontSize: {
				min: 1.5,
				max: 3,
				maxWidth: 1440,
				sizeUnit: "rem",
				widthUnit: "px",
			},
			lineHeight: 1,
			lineHeightUnits: "em",
			fontWeight: "400",
			fontStyle: "normal",
			letterSpacing: 0,
			letterSpacingUnits: "px",
		},
	],
	colors: [
		{ hexCode: "#ff5733", name: "Primary" },
		{ hexCode: "#3333ff", name: "Secondary" },
	],
	spacing: [
		{
			key: "Default",
			maxWidth: 1200,
			widthUnit: "px",
			sectionPadding: {
				default: {
					top: {
						min: 1.5,
						max: 5,
						maxWidth: 1440,
						sizeUnit: "rem",
						widthUnit: "px",
					},
					right: {
						min: 1.5,
						max: 5,
						maxWidth: 1440,
						sizeUnit: "rem",
						widthUnit: "px",
					},
					bottom: {
						min: 1.5,
						max: 5,
						maxWidth: 1440,
						sizeUnit: "rem",
						widthUnit: "px",
					},
					left: {
						min: 1.5,
						max: 5,
						maxWidth: 1440,
						sizeUnit: "rem",
						widthUnit: "px",
					},
				},
			},
			gap: {
				default: {
					row: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						sizeUnit: "rem",
						widthUnit: "px",
					},
					column: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						sizeUnit: "rem",
						widthUnit: "px",
					},
				},
			},
		},
	],
};

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

	// // Typographies dynamiques
	// const {
	// 	fields: typoFields,
	// 	append: appendFont,
	// 	remove: removeFont,
	// } = useFieldArray({
	// 	control,
	// 	name: "typography",
	// });

	// Couleurs dynamiques
	const {
		fields: colorFields,
		append: appendColor,
		remove: removeColor,
	} = useFieldArray({
		control,
		name: "colors",
	});

	// Spacing dynamique
	const {
		fields: spacingFields,
		append: appendSpacing,
		remove: removeSpacing,
	} = useFieldArray({
		control,
		name: "spacing",
	});

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
					<ColorPaletteEditor
						colorFields={colorFields}
						register={register}
						removeColor={removeColor}
						appendColor={appendColor}
					/>
					<ColorPreview colors={colors} />
				</div>

				<div className="grid grid-cols-2 gap-4 items-start">
					<SpacingEditor
						spacingFields={spacingFields}
						register={register}
						removeSpacing={removeSpacing}
						appendSpacing={appendSpacing}
					/>
					<SpacingPreview spacing={spacing} />
				</div>
				<Button type="submit">Sauvegarder</Button>
			</form>
			{/*<PreviewPanel typography={typography} colors={colors} spacing={spacing} />*/}
		</div>
	);
}
