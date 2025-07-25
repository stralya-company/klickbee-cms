"use client";

import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useDeleteUsers } from "@/feature/user/queries/useDeleteUsers";
import { useUserSelectionStore } from "@/feature/user/stores/storeUserSelection";

export default function ActionButton() {
	const t = useTranslations("SettingsUsers");
	const tCommon = useTranslations("Common");
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const searchParams = useSearchParams();
	const clearSelection = useUserSelectionStore(
		(state) => state.clearSelection,
	);

	const clearSelectionCallback = () => {
		clearSelection?.();
	};

	const deleteUsersMutation = useDeleteUsers();

	const selectedUsers =
		searchParams.get("selected")?.split(",").filter(Boolean) || [];

	const hasSelection = selectedUsers.length > 0;

	const handleDeleteSelected = () => {
		deleteUsersMutation.mutate(selectedUsers, {
			onError: () => {
				toast.error(t("DeleteUsersError"));
			},
			onSuccess: (result) => {
				if (result.length > 0) {
					clearSelectionCallback();
					toast.success(
						t("DeleteUsersSuccess", { count: result.length }),
					);
				}
			},
		});
	};

	if (hasSelection) {
		return (
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						className="flex items-center gap-2"
						variant="destructive"
					>
						<Trash className="h-4 w-4" />
						{tCommon("DeleteSelected")} ({selectedUsers.length})
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("DeleteUsersTitle")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("DeleteUsersDescription", {
								count: selectedUsers.length,
							})}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{tCommon("Cancel")}
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-white hover:bg-destructive/90"
							onClick={handleDeleteSelected}
						>
							{tCommon("Delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}

	return (
		<Button
			asChild
			className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
		>
			<Link href={`/admin/${adminKey}/manage/settings/users/create`}>
				<Plus className="h-4 w-4" />
				{t("AddUser")}
			</Link>
		</Button>
	);
}
