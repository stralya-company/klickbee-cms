"use client";

import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export default function ActionButton() {
	const t = useTranslations("SettingsUsers");
	const tCommon = useTranslations("Common");
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const searchParams = useSearchParams();
	const selectedUsers =
		searchParams.get("selected")?.split(",").filter(Boolean) || [];
	const hasSelection = selectedUsers.length > 0;

	const handleDeleteSelected = () => {
		// TODO: Implémenter la suppression des utilisateurs sélectionnés
	};

	if (hasSelection) {
		return (
			<Button
				className="flex items-center gap-2"
				onClick={handleDeleteSelected}
				variant="destructive"
			>
				<Trash className="h-4 w-4" />
				{tCommon("DeleteSelected")} ({selectedUsers.length})
			</Button>
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
