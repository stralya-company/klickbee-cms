import React from "react";
import { Input } from "@/components/ui/input";
import { Pencil, HelpCircle } from "lucide-react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { InputWithUnit } from "@/builder/components/settings/_partials/InputWithUnit";
import { sizeUnits } from "@/builder/types/settings/FluidSize";
import {
	typographyUsages,
	typographyFontStyles,
	typographyFontWeights,
	TypographyFontWeight,
	TypographyFontStyle,
	TypographyUsage,
} from "@/builder/types/settings/TypographySettings";
import {
	Control,
	useController,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

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
		name: `typography.typographies.${idx}.lineHeight`,
		control,
	});
	const { field: fontSizeMinField } = useController({
		name: `typography.typographies.${idx}.fontSize.min`,
		control,
	});
	const { field: fontSizeMaxField } = useController({
		name: `typography.typographies.${idx}.fontSize.max`,
		control,
	});
	const { field: fontSizeUnitField } = useController({
		name: `typography.typographies.${idx}.fontSize.sizeUnit`,
		control,
	});
	const { field: letterSpacingField } = useController({
		name: `typography.typographies.${idx}.letterSpacing`,
		control,
	});
	const { field: letterSpacingUnitField } = useController({
		name: `typography.typographies.${idx}.letterSpacingUnits`,
		control,
	});

	return (
		<div className="flex items-start gap-2">
			<Input
				{...register(`typography.typographies.${idx}.key`)}
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
					<Label className="flex items-center gap-1">
						Font Family
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Select a font family from Google Fonts
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
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
											typography?.typographies?.[idx]
												?.fontFamily,
									)?.label || "Select a font"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<div className="px-2 py-1">
									<Input
										ref={searchInputRef}
										placeholder="Search fonts..."
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
										Loading...
									</div>
								)}
								{filteredFonts.length === 0 && !isLoading && (
									<div className="px-2 py-1 text-xs text-muted-foreground">
										No fonts found
									</div>
								)}
								{filteredFonts.map((opt) => (
									<DropdownMenuItem
										key={opt.value}
										onClick={() => {
											setValue(
												`typography.typographies.${idx}.fontFamily`,
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

					<Label className="flex items-center gap-1">
						Min Size
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Minimum font size (for smallest
										viewport)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						value={fontSizeMinField.value}
						onChange={(v) => fontSizeMinField.onChange(Number(v))}
						unit={fontSizeUnitField.value ?? "rem"}
						onUnitChange={(u) => fontSizeUnitField.onChange(u)}
						units={sizeUnits}
					/>

					<Label className="flex items-center gap-1">
						Max Size
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Maximum font size (for largest viewport)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						value={fontSizeMaxField.value}
						onChange={(v) => fontSizeMaxField.onChange(Number(v))}
						unit={fontSizeUnitField.value ?? "rem"}
						onUnitChange={(u) => fontSizeUnitField.onChange(u)}
						units={sizeUnits}
					/>

					<Label className="flex items-center gap-1">
						Max Width
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Viewport width at which max size is
										reached
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Input
						type="number"
						{...register(
							`typography.typographies.${idx}.fontSize.maxWidth`,
							{
								valueAsNumber: true,
							},
						)}
					/>

					<Label className="flex items-center gap-1">
						Line Height
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Line height for better readability
										(1.2-1.6 recommended)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						value={lineHeightField.value}
						onChange={(v) => lineHeightField.onChange(Number(v))}
						unit={
							typography?.typographies?.[idx]?.lineHeightUnits ??
							"em"
						}
						onUnitChange={(u) =>
							setValue(
								`typography.typographies.${idx}.lineHeightUnits`,
								u,
							)
						}
						units={sizeUnits}
					/>
					<Label className="flex items-center gap-1">
						Font Weight
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Select a font weight (100-900, normal,
										bold, bolder)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Select
						defaultValue={
							typography?.typographies?.[idx]?.fontWeight
						}
						onValueChange={(value: TypographyFontWeight) =>
							setValue(
								`typography.typographies.${idx}.fontWeight`,
								value,
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select font weight" />
						</SelectTrigger>
						<SelectContent>
							{typographyFontWeights.map((weight) => (
								<SelectItem key={weight} value={weight}>
									{weight}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Label className="flex items-center gap-1">
						Font Style
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Select a font style or text transform
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Select
						defaultValue={
							typography?.typographies?.[idx]?.fontStyle
						}
						onValueChange={(value: TypographyFontStyle) =>
							setValue(
								`typography.typographies.${idx}.fontStyle`,
								value,
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select font style" />
						</SelectTrigger>
						<SelectContent>
							{typographyFontStyles.map((style) => (
								<SelectItem key={style} value={style}>
									{style.charAt(0).toUpperCase() +
										style.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Label className="flex items-center gap-1">
						Letter Spacing
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Space between letters (0 for normal,
										negative for tighter, positive for
										looser)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						value={letterSpacingField.value}
						onChange={(v) => letterSpacingField.onChange(Number(v))}
						unit={letterSpacingUnitField.value ?? "px"}
						onUnitChange={(u) => letterSpacingUnitField.onChange(u)}
						units={sizeUnits}
					/>

					<Label className="flex items-center gap-1">
						Semantic Usage
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										The semantic purpose of this typography
										style
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Select
						defaultValue={
							typography?.typographies?.[idx]?.typographyUsage
						}
						onValueChange={(value: TypographyUsage) =>
							setValue(
								`typography.typographies.${idx}.typographyUsage`,
								value,
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select usage context" />
						</SelectTrigger>
						<SelectContent>
							{typographyUsages.map((usage) => (
								<SelectItem key={usage} value={usage}>
									{usage.charAt(0).toUpperCase() +
										usage.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
