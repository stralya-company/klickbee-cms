import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";

type ColorPaletteEditorProps = {
	colorFields: FieldArrayWithId<FormValues, "colors", "id">[];
	register: UseFormRegister<FormValues>;
	removeColor: (_index: number) => void;
	appendColor: (_value: { hexCode: string; name: string }) => void;
};

const ColorPaletteEditor = React.memo(function ColorPaletteEditor({
	colorFields,
	register,
	removeColor,
	appendColor,
}: ColorPaletteEditorProps) {
	const handleAdd = useCallback(
		() => appendColor({ hexCode: "#000000", name: "" }),
		[appendColor],
	);
	const handleRemove = useCallback(
		(idx: number) => removeColor(idx),
		[removeColor],
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Couleurs</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{colorFields.map((color, idx) => (
					<div key={color.id} className="flex items-center gap-2">
						<Input
							type="color"
							{...register(`colors.${idx}.hexCode`)}
							aria-label="Sélecteur de couleur"
							className="w-10 h-10 p-0 border"
						/>
						<Input
							{...register(`colors.${idx}.name`)}
							placeholder="Nom de la couleur"
							aria-label="Nom de la couleur"
						/>
						{colorFields.length > 1 && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								aria-label="Supprimer la couleur"
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
					onClick={handleAdd}
					aria-label="Ajouter une couleur"
				>
					<span className="w-4 h-4 mr-1">+</span> Ajouter une couleur
				</Button>
			</CardContent>
		</Card>
	);
});

export default ColorPaletteEditor;
