import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";

type SpacingEditorProps = {
	spacingFields: FieldArrayWithId<FormValues, "spacing", "id">[];
	register: UseFormRegister<FormValues>;
	removeSpacing: (_index: number) => void;
	appendSpacing: (_value: {
		sectionPadding: {
			default: {
				top: {
					min: number;
					widthUnit: string;
					max: number;
					sizeUnit: string;
					maxWidth: number;
				};
				left: {
					min: number;
					widthUnit: string;
					max: number;
					sizeUnit: string;
					maxWidth: number;
				};
				bottom: {
					min: number;
					widthUnit: string;
					max: number;
					sizeUnit: string;
					maxWidth: number;
				};
				right: {
					min: number;
					widthUnit: string;
					max: number;
					sizeUnit: string;
					maxWidth: number;
				};
			};
		};
		gap: {
			default: {
				column: {
					min: number;
					widthUnit: string;
					max: number;
					sizeUnit: string;
					maxWidth: number;
				};
				row: {
					min: number;
					widthUnit: string;
					max: number;
					sizeUnit: string;
					maxWidth: number;
				};
			};
		};
		key: string;
		maxWidth: number;
	}) => void;
};

const SpacingEditor = React.memo(function SpacingEditor({
	spacingFields,
	register,
	removeSpacing,
	appendSpacing,
}: SpacingEditorProps) {
	const handleAdd = useCallback(() => {
		appendSpacing({
			key: "",
			maxWidth: 1440,
			sectionPadding: {
				default: {
					top: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						widthUnit: "px",
						sizeUnit: "rem",
					},
					right: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						widthUnit: "px",
						sizeUnit: "rem",
					},
					bottom: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						widthUnit: "px",
						sizeUnit: "rem",
					},
					left: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						widthUnit: "px",
						sizeUnit: "rem",
					},
				},
			},
			gap: {
				default: {
					row: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						widthUnit: "px",
						sizeUnit: "rem",
					},
					column: {
						min: 1,
						max: 2,
						maxWidth: 1440,
						widthUnit: "px",
						sizeUnit: "rem",
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
							{...register(`spacing.${idx}.maxWidth`)}
							placeholder="Largeur max"
							aria-label="Largeur max"
						/>
						<Label>Padding (Elementor style)</Label>
						<div className="flex gap-1">
							<Input
								{...register(
									`spacing.${idx}.sectionPadding.default.top.min`,
								)}
								placeholder="Top"
								className="w-16"
								aria-label="Padding haut"
							/>
							<Input
								{...register(
									`spacing.${idx}.sectionPadding.default.right.min`,
								)}
								placeholder="Right"
								className="w-16"
								aria-label="Padding droite"
							/>
							<Input
								{...register(
									`spacing.${idx}.sectionPadding.default.bottom.min`,
								)}
								placeholder="Bottom"
								className="w-16"
								aria-label="Padding bas"
							/>
							<Input
								{...register(
									`spacing.${idx}.sectionPadding.default.left.min`,
								)}
								placeholder="Left"
								className="w-16"
								aria-label="Padding gauche"
							/>
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
