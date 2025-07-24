"use client";

import {
	type ColumnFiltersState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type RowSelectionState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	Edit,
	MoreHorizontal,
	Trash,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAllUsers } from "@/feature/settings/queries/useAllUsers";

type User = {
	id: string;
	name: string | null;
	image: string | null;
	createdAt: Date;
};

const columnHelper = createColumnHelper<User>();

function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	locale: string,
) {
	return [
		columnHelper.display({
			cell: ({ row }) => (
				<Checkbox
					aria-label="Select row"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			),
			enableHiding: false,
			enableSorting: false,
			header: ({ table }) => (
				<Checkbox
					aria-label="Select all"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
				/>
			),
			id: "select",
		}),
		columnHelper.accessor("image", {
			cell: ({ row, getValue }) => (
				<Avatar className="h-8 w-8">
					<AvatarImage
						alt={row.original.name || ""}
						src={getValue() || ""}
					/>
					<AvatarFallback>
						{row.original.name?.charAt(0)?.toUpperCase() || "U"}
					</AvatarFallback>
				</Avatar>
			),
			enableSorting: false,
			header: t("Profile"),
		}),
		columnHelper.accessor("name", {
			cell: ({ getValue }) => (
				<span>{getValue() || t("NameNotAvailable")}</span>
			),
			header: ({ column }) => (
				<Button
					className="p-0 h-auto font-semibold"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					variant="ghost"
				>
					{t("Name")}
					{column.getIsSorted() === "asc" ? (
						<ChevronUpIcon className="ml-2 h-4 w-4" />
					) : column.getIsSorted() === "desc" ? (
						<ChevronDownIcon className="ml-2 h-4 w-4" />
					) : null}
				</Button>
			),
		}),
		columnHelper.accessor("createdAt", {
			cell: ({ getValue }) => {
				const date = getValue();
				return new Intl.DateTimeFormat(locale, {
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					month: "2-digit",
					year: "numeric",
				}).format(new Date(date));
			},
			header: ({ column }) => (
				<Button
					className="p-0 h-auto font-semibold"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					variant="ghost"
				>
					{tCommon("CreatedAt")}
					{column.getIsSorted() === "asc" ? (
						<ChevronUpIcon className="ml-2 h-4 w-4" />
					) : column.getIsSorted() === "desc" ? (
						<ChevronDownIcon className="ml-2 h-4 w-4" />
					) : null}
				</Button>
			),
		}),
		columnHelper.display({
			cell: () => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-8 w-8 p-0" variant="ghost">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Edit className="mr-2 h-4 w-4" />
								{tCommon("Edit")}
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								<Trash className="mr-2 h-4 w-4" />
								{tCommon("Delete")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
			header: "",
			id: "actions",
		}),
	];
}

export default function UsersTable() {
	const { data: users } = useAllUsers();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const searchParams = useSearchParams();
	const router = useRouter();
	const globalFilter = searchParams.get("search") || "";
	const currentPage = parseInt(searchParams.get("page") || "1");
	const pageSize = 10;
	const pagination: PaginationState = {
		pageIndex: currentPage - 1, // TanStack Table uses 0-based indexing
		pageSize,
	};
	const t = useTranslations("SettingsUsers");
	const tCommon = useTranslations("Common");
	const locale = useLocale();

	const userData = Array.isArray(users) ? users : [];
	const columns = createColumns(t, tCommon, locale);

	// Sync rowSelection with URL
	useEffect(() => {
		const selectedIds = Object.keys(rowSelection).filter(
			(id) => rowSelection[id],
		);
		const params = new URLSearchParams(searchParams);

		if (selectedIds.length > 0) {
			params.set("selected", selectedIds.join(","));
		} else {
			params.delete("selected");
		}

		router.replace(`?${params.toString()}`);
	}, [rowSelection, router, searchParams]);

	// Initialize rowSelection from URL
	useEffect(() => {
		const selectedFromUrl =
			searchParams.get("selected")?.split(",").filter(Boolean) || [];
		if (selectedFromUrl.length > 0) {
			const initialSelection: RowSelectionState = {};
			selectedFromUrl.forEach((id) => {
				initialSelection[id] = true;
			});
			setRowSelection(initialSelection);
		}
	}, [searchParams]);

	const table = useReactTable({
		columns,
		data: userData,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		globalFilterFn: "includesString",
		manualPagination: false,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		state: {
			columnFilters,
			globalFilter,
			pagination,
			rowSelection,
			sorting,
		},
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								data-state={row.getIsSelected() && "selected"}
								key={row.id}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								className="h-24 text-center"
								colSpan={columns.length}
							>
								{t("NoUsersFound")}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
