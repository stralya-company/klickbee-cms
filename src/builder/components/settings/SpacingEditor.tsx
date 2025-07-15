import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FieldArrayWithId, useForm, UseFormRegister } from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";
import { SizeUnit } from "@/builder/types/FluidSize";

type SpacingEditorProps = {
	spacingFields: FieldArrayWithId<FormValues, "spacing", "id">[];
	register: UseFormRegister<FormValues>;
	removeSpacing: (_index: number) => void;
	appendSpacing: (_value: {
		key: string;
		maxWidth: number;
		widthUnit: SizeUnit;
		sectionPadding: {
			default: {
				top: {
					min: number;
					max: number;
					maxWidth: number;
					sizeUnit: SizeUnit;
					widthUnit: SizeUnit;
				};
				left: {
					min: number;
					max: number;
					maxWidth: number;
					sizeUnit: SizeUnit;
					widthUnit: SizeUnit;
				};
				bottom: {
					min: number;
					max: number;
					maxWidth: number;
					sizeUnit: SizeUnit;
					widthUnit: SizeUnit;
				};
				right: {
					min: number;
					max: number;
					maxWidth: number;
					sizeUnit: SizeUnit;
					widthUnit: SizeUnit;
				};
			};
		};
		gap: {
			default: {
				column: {
					min: number;
					max: number;
					maxWidth: number;
					sizeUnit: SizeUnit;
					widthUnit: SizeUnit;
				};
				row: {
					min: number;
					max: number;
					maxWidth: number;
					sizeUnit: SizeUnit;
					widthUnit: SizeUnit;
				};
			};
		};
	}) => void;
	watch: ReturnType<typeof useForm<FormValues>>["watch"];
	setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
};
const SpacingEditor = React.memo(function SpacingEditor({
	spacingFields,
	register,
	removeSpacing,
	appendSpacing,
	watch,
	setValue,
}: SpacingEditorProps) {
	const handleAdd = useCallback(() => {
		appendSpacing({
			key: "",
			maxWidth: 1440,
			widthUnit: "px",
			sectionPadding: {
				default: {
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
		});
	}, [appendSpacing]);

	const handleRemove = useCallback(
		(idx: number) => removeSpacing(idx),
		[removeSpacing],
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Spacings</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{spacingFields.map((space, idx) => (
					<div key={space.id} className="space-y-2">
						<Label>Key: </Label>
						<Input
							{...register(`spacing.${idx}.key`)}
							className="w-24 h-7 text-xs mb-2"
							placeholder="Nom du spacing"
							aria-label="Nom du spacing"
						/>
						<Label>Max Width</Label>
						<Input
							value={watch(`spacing.${idx}.maxWidth`)}
							onChange={(e) =>
								setValue(
									`spacing.${idx}.maxWidth`,
									Number(e.target.value),
								)
							}
							className="w-24 h-7 text-xs mb-2"
							placeholder="Max Width"
							aria-label="Max Width"
						/>
						<Label>Padding</Label>
						<div className="flex gap-1 items-end">
							{(["top", "right", "bottom", "left"] as const).map(
								(side) => (
									<div
										key={side}
										className="flex flex-col items-center"
									>
										<Input
											{...register(
												`spacing.${idx}.sectionPadding.default.${side}.min`,
											)}
											placeholder={
												side.charAt(0).toUpperCase() +
												side.slice(1)
											}
											className="w-16"
											aria-label={`Padding ${side}`}
										/>
										<span className="text-xs text-muted-foreground">
											{spacingFields[idx].widthUnit}
										</span>
									</div>
								),
							)}
						</div>
						{spacingFields.length > 1 && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								aria-label="Supprimer le spacing"
								onClick={() => handleRemove(idx)}
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
					onClick={handleAdd}
					aria-label="Ajouter un spacing"
				>
					<Plus className="w-4 h-4 mr-1" /> Ajouter un spacing
				</Button>
			</CardContent>
		</Card>
	);
});

export default SpacingEditor;
