"use client";
import { useState } from "react";
import BuilderSearchComponent from "@/components/builder/ui/_partials/Sidebars/Left/Search";
import BuilderTabContent from "@/components/builder/ui/_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "@/components/builder/ui/_partials/Sidebars/Left/TabSwitcher";
import { useCurrentTabStore } from "@/feature/builder/store/storeCurrentTabsSidebar";

export default function BuilderLeftSidebar() {
	useCurrentTabStore.setState({
		currentTab: "Pages",
	});

	return (
		<div className="w-64 bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
			<BuilderTabSwitcher />
			<BuilderSearchComponent />
			<BuilderTabContent />
		</div>
	);
}
