"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	globalSettingsSchema,
	defaultGlobalSettings,
} from "@/builder/types/GlobalSettingsData";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import TypographyEditor from "@/builder/components/settings/TypographyEditor";
import ColorPaletteEditor from "@/builder/components/settings/ColorEditor";
import SpacingEditor from "@/builder/components/settings/SpacingEditor";
import SpacingPreview from "@/builder/components/settings/SpacingPreview";
import ColorPreview from "@/builder/components/settings/ColorPreview";
import TypographyPreview from "@/builder/components/settings/TypographyPreview";
import LogoEditor from "@/builder/components/settings/LogoEditor";

export type FormValues = z.output<typeof globalSettingsSchema>;

// Create custom defaultValues that match component expectations
const defaultValues: FormValues = {
	logos: defaultGlobalSettings.logos,
	colors: defaultGlobalSettings.colors,
	typography: defaultGlobalSettings.typography,
	spacing: defaultGlobalSettings.spacing,
};

export default function AdminBuilderSettingsPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

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
	const hasErrors = Object.keys(errors).length > 0;
	if (hasErrors) {
		console.error("Form errors:", errors);
	}

	const onSubmit = async (data: FormValues) => {
		try {
			setIsSubmitting(true);

			// Transform data to match API expectations
			const transformedData = {
				...data,
				typography: {
					maxWidth: defaultGlobalSettings.typography.maxWidth,
					typographies: data.typography,
				},
				spacing: data.spacing, // Take the first spacing object
			};

			const response = await fetch("/api/admin/builder/settings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(transformedData),
			});

			if (!response.ok) {
				throw new Error("Failed to save settings");
			}

			toast("Succès", {
				description: "Les paramètres ont été sauvegardés avec succès.",
			});
		} catch (error) {
			console.error("Error saving settings:", error);
			toast("Erreur", {
				description:
					"Une erreur est survenue lors de la sauvegarde des paramètres.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Couleurs dynamiques
	const {
		fields: colorFields,
		append: appendColor,
		remove: removeColor,
	} = useFieldArray({
		control,
		name: "colors",
	});

	const {
		fields: paddingFields,
		append: appendPadding,
		remove: removePadding,
	} = useFieldArray({
		control,
		name: "spacing.sectionPadding",
	});

	const {
		fields: gapFields,
		append: appendGap,
		remove: removeGap,
	} = useFieldArray({
		control,
		name: "spacing.gap",
	});

	const watched = watch();
	const typography = watched.typography;
	const spacing = watched.spacing;
	const colors = watched.colors;

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">Paramètres globaux</h1>
			<p className="text-gray-500 mb-8">
				Configurez les paramètres globaux de votre site, comme la
				typographie, les couleurs, les espacements et les logos.
			</p>

			{hasErrors && (
				<Alert variant="destructive" className="mb-6">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Erreur</AlertTitle>
					<AlertDescription>
						Il y a des erreurs dans le formulaire. Veuillez les
						corriger avant de soumettre.
					</AlertDescription>
				</Alert>
			)}

			<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Typographie</h2>
					<p className="text-gray-500 mb-4">
						Définissez les styles de texte utilisés sur votre site.
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<TypographyEditor
							register={register}
							setValue={setValue}
							control={control}
							watch={watch}
						/>
						<TypographyPreview typography={typography} />
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Couleurs</h2>
					<p className="text-gray-500 mb-4">
						Définissez la palette de couleurs de votre site.
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<ColorPaletteEditor
							colorFields={colorFields}
							register={register}
							setValue={setValue}
							removeColor={removeColor}
							appendColor={appendColor}
						/>
						<ColorPreview colors={colors} />
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Espacements</h2>
					<p className="text-gray-500 mb-4">
						Configurez les espacements et marges utilisés dans la
						mise en page.
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<SpacingEditor
							paddingFields={paddingFields}
							gapFields={gapFields}
							removePadding={removePadding}
							removeGap={removeGap}
							appendPadding={appendPadding}
							appendGap={appendGap}
							register={register}
							watch={watch}
							setValue={setValue}
						/>
						<SpacingPreview spacing={spacing} />
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Logos</h2>
					<p className="text-gray-500 mb-4">
						Téléchargez et gérez les logos de votre site.
					</p>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<LogoEditor
							logos={watched.logos}
							onChange={(logos) => setValue("logos", logos)}
						/>
					</div>
				</section>

				<div className="flex justify-end">
					<Button
						type="submit"
						disabled={isSubmitting}
						className="px-6"
					>
						{isSubmitting
							? "Sauvegarde en cours..."
							: "Sauvegarder les paramètres"}
					</Button>
				</div>
			</form>
		</div>
	);
}
