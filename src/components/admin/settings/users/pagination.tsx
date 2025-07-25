"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAllUsers } from "@/feature/user/queries/useAllUsers";

export default function Pagination() {
	const tCommon = useTranslations("Common");
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: users } = useAllUsers();

	const userData = Array.isArray(users) ? users : [];
	const globalFilter = searchParams.get("search") || "";
	const pageSize = 10;

	// Filter data the same way as UsersTable
	const filteredData = useMemo(() => {
		if (!globalFilter) return userData;
		return userData.filter((user) =>
			user.name?.toLowerCase().includes(globalFilter.toLowerCase()),
		);
	}, [userData, globalFilter]);

	const currentPage = parseInt(searchParams.get("page") || "1");
	const totalPages = Math.ceil(filteredData.length / pageSize);

	const updatePage = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		if (newPage === 1) {
			params.delete("page");
		} else {
			params.set("page", newPage.toString());
		}
		router.replace(`?${params.toString()}`);
	};

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex items-center justify-between">
			<div className="text-sm text-muted-foreground">
				{tCommon("Page")} {currentPage} {tCommon("Of")} {totalPages}
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="flex items-center gap-1"
					disabled={!canGoPrevious}
					onClick={() => updatePage(currentPage - 1)}
					size="sm"
					variant="outline"
				>
					<ChevronLeft className="h-4 w-4" />
					{tCommon("Previous")}
				</Button>

				<Button
					className="flex items-center gap-1"
					disabled={!canGoNext}
					onClick={() => updatePage(currentPage + 1)}
					size="sm"
					variant="outline"
				>
					{tCommon("Next")}
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
