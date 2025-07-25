import { createColumnHelper } from "@tanstack/react-table";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	Edit,
	MoreHorizontal,
	Trash,
} from "lucide-react";
import Link from "next/link";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/feature/user/types/user";

const columnHelper = createColumnHelper<User>();

export function createColumns(
	t: (key: string) => string,
	tCommon: (key: string) => string,
	locale: string,
	adminKey: string,
	onDeleteUser: (userId: string) => void,
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
					{tCommon("Name")}
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
			cell: ({ row }) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-8 w-8 p-0" variant="ghost">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild>
								<Link
									href={`/admin/${adminKey}/manage/settings/users/${row.original.id}`}
								>
									<Edit className="mr-2 h-4 w-4" />
									{tCommon("Edit")}
								</Link>
							</DropdownMenuItem>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<DropdownMenuItem
										className="text-destructive"
										onSelect={(e) => e.preventDefault()}
									>
										<Trash className="mr-2 h-4 w-4" />
										{tCommon("Delete")}
									</DropdownMenuItem>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											{t("DeleteUserTitle")}
										</AlertDialogTitle>
										<AlertDialogDescription>
											{t("DeleteUserDescription")}
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											{tCommon("Cancel")}
										</AlertDialogCancel>
										<AlertDialogAction
											aria-label={`Confirm deletion of user ${row.original.name}`}
											className="bg-destructive text-white hover:bg-destructive/90"
											onClick={() =>
												onDeleteUser(row.original.id)
											}
										>
											{tCommon("Delete")}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
			header: "",
			id: "actions",
		}),
	];
}
