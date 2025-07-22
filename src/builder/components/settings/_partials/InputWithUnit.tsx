import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { SizeUnit } from "@/builder/types/settings/FluidSize";

export function InputWithUnit({
	value,
	onChange,
	unit,
	onUnitChange,
	units,
	inputProps,
	buttonClassName = "",
}: {
	value: number;
	onChange: (_v: number) => void;
	unit: string;
	onUnitChange: (_u: SizeUnit) => void;
	units: readonly string[];
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	buttonClassName?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex items-center gap-1">
			<Input
				type="number"
				step="any"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-20"
				{...inputProps}
			/>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className={buttonClassName + " px-2 min-w-8"}
					>
						{unit}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{units.map((u) => (
						<DropdownMenuItem
							key={u}
							onClick={() => {
								onUnitChange(u as SizeUnit);
								setOpen(false);
							}}
						>
							{u}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
