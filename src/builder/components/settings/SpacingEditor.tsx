import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FieldArrayWithId, useForm, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";
import { SectionGap, SectionPadding } from "@/builder/types/SpacingSettings";

type SpacingEditorProps = {
	paddingFields: FieldArrayWithId<
		FormValues,
		"spacing.sectionPadding",
		"id"
	>[];
	gapFields: FieldArrayWithId<FormValues, "spacing.gap", "id">[];
	register: UseFormRegister<FormValues>;
	removePadding: (_index: number) => void;
	appendPadding: (_value: SectionPadding) => void;
	removeGap: (_index: number) => void;
	appendGap: (_value: SectionGap) => void;
	watch: ReturnType<typeof useForm<FormValues>>["watch"];
	setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
};

const SpacingEditor = React.memo(function SpacingEditor({
	paddingFields,
	gapFields,
	register,
	removePadding,
	appendPadding,
	removeGap,
	appendGap,
	watch,
	setValue,
}: SpacingEditorProps) {
	const t = useTranslations("SpacingEditor");
	// // Ajout d’un padding
	// const handleAddPadding = useCallback(() => {
	// 	appendPadding({
	// 		key: "",
	// 		top: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		right: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		bottom: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		left: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 	});
	// }, [appendPadding]);
	//
	// // Ajout d’un gap
	// const handleAddGap = useCallback(() => {
	// 	appendGap({
	// 		key: "",
	// 		row: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 		column: {
	// 			min: 1,
	// 			max: 2,
	// 			maxWidth: 1440,
	// 			sizeUnit: "rem",
	// 			widthUnit: "px",
	// 		},
	// 	});
	// }, [appendGap]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("Title")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Section Padding */}
				<div>
					<h3 className="font-semibold mb-2">{t("Padding")}</h3>

					<Label>{t("MaxWidth")}</Label>
					<Input
						value={watch(`spacing.maxWidth`)}
						onChange={(e) =>
							setValue(`spacing.maxWidth`, Number(e.target.value))
						}
						className="w-24 h-7 text-xs mb-2"
						placeholder={t("MaxWidth")}
						aria-label={t("MaxWidth")}
					/>
					{paddingFields.map((pad: SectionPadding, idx) => (
						<div key={idx} className="mb-4">
							<Label>{t("Key")}</Label>
							<Input
								{...register(
									`spacing.sectionPadding.${idx}.key`,
								)}
								className="w-24 h-7 text-xs mb-2"
								placeholder={t("PaddingName")}
								aria-label={t("PaddingName")}
							/>

							<Label>{t("Padding")}</Label>
							<div className="flex gap-1 items-end">
								{(
									["top", "right", "bottom", "left"] as const
								).map((side) => (
									<div
										key={side}
										className="flex flex-col items-center"
									>
										<Input
											{...register(
												`spacing.sectionPadding.${idx}.${side}.min`,
											)}
											placeholder={
												side.charAt(0).toUpperCase() +
												side.slice(1)
											}
											className="w-16"
											aria-label={`${t("Padding")} ${side}`}
										/>
										<span className="text-xs text-muted-foreground">
											{pad?.[side]?.widthUnit}
										</span>
									</div>
								))}
							</div>
							{paddingFields.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label={t("DeletePadding")}
									onClick={() => removePadding(idx)}
								>
									✕
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() =>
							appendPadding({
								top: {
									min: 1,
									max: 2,
									maxWidth: 1440,
									sizeUnit: "rem",
									widthUnit: "px",
								},
								right: {
									min: 1,
									max: 2,
									maxWidth: 1440,
									sizeUnit: "rem",
									widthUnit: "px",
								},
								bottom: {
									min: 1,
									max: 2,
									maxWidth: 1440,
									sizeUnit: "rem",
									widthUnit: "px",
								},
								left: {
									min: 1,
									max: 2,
									maxWidth: 1440,
									sizeUnit: "rem",
									widthUnit: "px",
								},
								key: "",
							})
						}
						aria-label={t("AddPadding")}
					>
						<Plus className="w-4 h-4 mr-1" /> {t("AddPadding")}
					</Button>
				</div>

				{/* Section Gap */}
				<div>
					<h3 className="font-semibold mb-2">{t("Gap")}</h3>
					{gapFields.map((gap, idx) => (
						<div key={gap.id} className="mb-4">
							<Label>{t("Key")}</Label>
							<Input
								{...register(`spacing.gap.${idx}.key`)}
								className="w-24 h-7 text-xs mb-2"
								placeholder={t("GapName")}
								aria-label={t("GapName")}
							/>
							<Label>{t("Gap")}</Label>
							<div className="flex gap-1 items-end">
								{(["row", "column"] as const).map((type) => (
									<div
										key={type}
										className="flex flex-col items-center"
									>
										<Input
											{...register(
												`spacing.gap.${idx}.${type}.min`,
											)}
											placeholder={
												type.charAt(0).toUpperCase() +
												type.slice(1)
											}
											className="w-16"
											aria-label={`${t("Gap")} ${type}`}
										/>
										<span className="text-xs text-muted-foreground">
											{gap?.[type]?.widthUnit}
										</span>
									</div>
								))}
							</div>
							{gapFields.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label={t("DeleteGap")}
									onClick={() => removeGap(idx)}
								>
									✕
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() =>
							appendGap({
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
								key: "",
							})
						}
						aria-label={t("AddGap")}
					>
						<Plus className="w-4 h-4 mr-1" /> {t("AddGap")}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
});

export default SpacingEditor;
