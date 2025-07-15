import React from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { InputWithUnit } from "@/builder/components/settings/_partials/InputWithUnit";
import { sizeUnits } from "@/builder/types/FluidSize";
import {
	Control,
	useController,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";

const TypographyItemEditor = ({
	idx,
	control,
	register,
	setValue,
	remove,
	openIdx,
	setOpenIdx,
	dropdownOpenIdx,
	setDropdownOpenIdx,
	search,
	setSearch,
	searchInputRef,
	allFonts,
	isLoading,
	filteredFonts,
	typography,
}: {
	idx: number;
	control: Control<FormValues>;
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	remove: (_index: number) => void;
	openIdx: number | null;
	setOpenIdx: (_idx: number | null) => void;
	dropdownOpenIdx: number | null;
	setDropdownOpenIdx: (_idx: number | null) => void;
	search: string;
	setSearch: (_val: string) => void;
	searchInputRef: React.RefObject<HTMLInputElement>;
	allFonts: { label: string; value: string }[];
	isLoading: boolean;
	filteredFonts: { label: string; value: string }[];
	typography: FormValues["typography"];
}) => {
	const { field: lineHeightField } = useController({
		name: `typography.${idx}.lineHeight`,
		control,
	});
	const { field: fontSizeMinField } = useController({
		name: `typography.${idx}.fontSize.min`,
		control,
	});
	const { field: fontSizeMaxField } = useController({
		name: `typography.${idx}.fontSize.max`,
		control,
	});
	const { field: fontSizeUnitField } = useController({
		name: `typography.${idx}.fontSize.sizeUnit`,
		control,
	});
	const { field: letterSpacingField } = useController({
		name: `typography.${idx}.letterSpacing`,
		control,
	});
	const { field: letterSpacingUnitField } = useController({
		name: `typography.${idx}.letterSpacingUnits`,
		control,
	});

	return (
		<div className="flex items-start gap-2">
			<Input
				{...register(`typography.${idx}.key`)}
				className="w-24 h-7 text-xs"
				placeholder="Nom"
			/>
			<Popover
				open={openIdx === idx}
				onOpenChange={(open) => setOpenIdx(open ? idx : null)}
			>
				<PopoverTrigger asChild>
					<Button variant="ghost" size="icon" className="mt-1">
						<Pencil className="w-4 h-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="grid grid-cols-2 gap-4 w-80">
					<Label>Famille</Label>
					<div className="col-span-2">
						<DropdownMenu
							open={dropdownOpenIdx === idx}
							onOpenChange={(open) => {
								setDropdownOpenIdx(open ? idx : null);
								if (open)
									setTimeout(
										() => searchInputRef.current?.focus(),
										10,
									);
								if (!open) setSearch("");
							}}
						>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-between"
								>
									{allFonts.find(
										(opt) =>
											opt.value ===
											typography?.[idx]?.fontFamily,
									)?.label || "Choisir"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<div className="px-2 py-1">
									<Input
										ref={searchInputRef}
										placeholder="Rechercher une police"
										value={search}
										onChange={(e) =>
											setSearch(e.target.value)
										}
										className="mb-2"
										onKeyDown={(e) => e.stopPropagation()}
									/>
								</div>
								{isLoading && (
									<div className="px-2 py-1 text-xs">
										Chargement...
									</div>
								)}
								{filteredFonts.length === 0 && !isLoading && (
									<div className="px-2 py-1 text-xs text-muted-foreground">
										Aucune police
									</div>
								)}
								{filteredFonts.map((opt) => (
									<DropdownMenuItem
										key={opt.value}
										onClick={() => {
											setValue(
												`typography.${idx}.fontFamily`,
												opt.value,
											);
											setDropdownOpenIdx(null);
										}}
									>
										{opt.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Label>Size Min</Label>
					<InputWithUnit
						value={fontSizeMinField.value?.toString() ?? ""}
						onChange={(v) => fontSizeMinField.onChange(Number(v))}
						unit={fontSizeUnitField.value ?? "rem"}
						onUnitChange={(u) => fontSizeUnitField.onChange(u)}
						units={sizeUnits}
					/>
					<Label>Size Max</Label>
					<InputWithUnit
						value={fontSizeMaxField.value?.toString() ?? ""}
						onChange={(v) => fontSizeMaxField.onChange(Number(v))}
						unit={fontSizeUnitField.value ?? "rem"}
						onUnitChange={(u) => fontSizeUnitField.onChange(u)}
						units={sizeUnits}
					/>
					<Label>Max Width</Label>
					<Input
						type="number"
						{...register(`typography.${idx}.fontSize.maxWidth`, {
							valueAsNumber: true,
						})}
					/>
					<Label>Line Height</Label>
					<InputWithUnit
						value={lineHeightField.value?.toString() ?? ""}
						onChange={(v) => lineHeightField.onChange(Number(v))}
						unit={typography?.[idx]?.lineHeightUnits ?? "em"}
						onUnitChange={(u) =>
							setValue(`typography.${idx}.lineHeightUnits`, u)
						}
						units={sizeUnits}
					/>
					<Label>Font Weight</Label>
					<Input {...register(`typography.${idx}.fontWeight`)} />
					<Label>Font Style</Label>
					<Input {...register(`typography.${idx}.fontStyle`)} />
					<Label>Letter Spacing</Label>
					<InputWithUnit
						value={letterSpacingField.value?.toString() ?? ""}
						onChange={(v) => letterSpacingField.onChange(Number(v))}
						unit={letterSpacingUnitField.value ?? "px"}
						onUnitChange={(u) => letterSpacingUnitField.onChange(u)}
						units={sizeUnits}
					/>
				</PopoverContent>
			</Popover>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={() => remove(idx)}
				className="ml-1"
			>
				✕
			</Button>
		</div>
	);
};

export default TypographyItemEditor;
