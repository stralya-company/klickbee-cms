"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	globalSettingsSchema,
	defaultGlobalSettings,
} from "@/builder/types/settings/GlobalSettingsData";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
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
	const t = useTranslations("BuilderSettings");

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

			toast(t("Success"), {
				description: t("SuccessMessage"),
			});
		} catch (error) {
			console.error("Error saving settings:", error);
			toast(t("Error"), {
				description: t("ErrorMessage"),
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
			<h1 className="text-3xl font-bold mb-6">{t("GlobalSettings")}</h1>
			<p className="text-gray-500 mb-8">
				{t("GlobalSettingsDescription")}
			</p>

			{hasErrors && (
				<Alert variant="destructive" className="mb-6">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>{t("Error")}</AlertTitle>
					<AlertDescription>{t("FormErrors")}</AlertDescription>
				</Alert>
			)}

			<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">
						{t("Typography")}
					</h2>
					<p className="text-gray-500 mb-4">
						{t("TypographyDescription")}
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
					<h2 className="text-xl font-semibold mb-4">
						{t("Colors")}
					</h2>
					<p className="text-gray-500 mb-4">
						{t("ColorsDescription")}
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
					<h2 className="text-xl font-semibold mb-4">
						{t("Spacing")}
					</h2>
					<p className="text-gray-500 mb-4">
						{t("SpacingDescription")}
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
					<h2 className="text-xl font-semibold mb-4">{t("Logos")}</h2>
					<p className="text-gray-500 mb-4">
						{t("LogosDescription")}
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
						{isSubmitting ? t("Saving") : t("SaveSettings")}
					</Button>
				</div>
			</form>
		</div>
	);
}
