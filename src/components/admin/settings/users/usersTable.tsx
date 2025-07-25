"use client";

import {
	type ColumnFiltersState,
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
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useAllUsers } from "@/feature/user/queries/useAllUsers";
import { useDeleteUser } from "@/feature/user/queries/useDeleteUser";
import { useUserSelectionStore } from "@/feature/user/stores/storeUserSelection";
import { useDebounce } from "@/hooks/useDebounce";
import { allUsersOptions } from "@/lib/allUsersOptions";
import { getQueryClient } from "@/lib/getQueryClient";
import { createColumns } from "./usersTableColumns";

export default function UsersTable() {
	const { data: users } = useAllUsers();
	const deleteUserMutation = useDeleteUser();
	const queryClient = getQueryClient();
	const setClearSelection = useUserSelectionStore(
		(state) => state.setClearSelection,
	);
	const adminKey = useAdminKeyStore((state) => state.adminKey);
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

	const handleDeleteUser = (userId: string) => {
		deleteUserMutation.mutate(userId, {
			onError: () => {
				toast.error(t("DeleteUserError"));
			},
			onSuccess: async (result) => {
				if (result) {
					await queryClient.invalidateQueries({
						queryKey: allUsersOptions.queryKey,
					});
					setRowSelection((prev) => {
						const newSelection = { ...prev };
						delete newSelection[userId];
						return newSelection;
					});
					toast.success(t("DeleteUserSuccess"));
				}
			},
		});
	};

	const clearTableSelection = () => {
		setRowSelection({});
	};

	// Register clear function in store
	useEffect(() => {
		setClearSelection(clearTableSelection);
	}, [setClearSelection]);

	const userData = Array.isArray(users) ? users : [];
	const columns = createColumns(
		t,
		tCommon,
		locale,
		adminKey ?? "",
		handleDeleteUser,
	);

	// Debounce rowSelection changes to avoid excessive URL updates
	const debouncedRowSelection = useDebounce(rowSelection, 300);

	// Sync rowSelection with URL (debounced)
	useEffect(() => {
		const selectedIds = Object.keys(debouncedRowSelection).filter(
			(id) => debouncedRowSelection[id],
		);
		const params = new URLSearchParams(searchParams);

		if (selectedIds.length > 0) {
			params.set("selected", selectedIds.join(","));
		} else {
			params.delete("selected");
		}

		router.replace(`?${params.toString()}`);
	}, [debouncedRowSelection, router, searchParams]);

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
		getRowId: (row) => row.id,
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
