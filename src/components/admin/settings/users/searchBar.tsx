"use client";

import { Search, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDeferredValue, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
	const t = useTranslations("SettingsUsers");
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		searchParams.get("search") || "",
	);
	const deferredSearchValue = useDeferredValue(searchValue);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (deferredSearchValue) {
			params.set("search", deferredSearchValue);
		} else {
			params.delete("search");
		}
		router.replace(`?${params.toString()}`);
	}, [deferredSearchValue, router, searchParams]);

	return (
		<div className="w-full max-w-md flex items-center space-x-2">
			<div className="relative flex-1">
				<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					className="pl-8"
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder={t("SearchUsers")}
					value={searchValue}
				/>
			</div>
		</div>
	);
}
