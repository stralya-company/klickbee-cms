"use client";

import { Plus, Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function ActionButton() {
	const t = useTranslations("SettingsUsers");
	const searchParams = useSearchParams();
	const selectedUsers =
		searchParams.get("selected")?.split(",").filter(Boolean) || [];
	const hasSelection = selectedUsers.length > 0;

	const handleAddUser = () => {
		// TODO: Implémenter l'ajout d'utilisateur
	};

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
				{t("DeleteSelected")} ({selectedUsers.length})
			</Button>
		);
	}

	return (
		<Button
			className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
			onClick={handleAddUser}
		>
			<Plus className="h-4 w-4" />
			{t("AddUser")}
		</Button>
	);
}
