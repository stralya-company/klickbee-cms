"use client";
import { useCallback, useEffect } from "react";
import BuilderFloatingActions from "@/components/builder/ui/BuilderFloatingActions";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { PageLight } from "@/feature/page/types/page";

interface BuilderComponentProps {
	homePageId?: number;
	pageData?: PageLight;
}

export default function BuilderComponent({
	homePageId,
	pageData,
}: BuilderComponentProps) {
	const setCurrentPage = useCurrentPageStore((state) => state.setCurrentPage);

	// Memoize the setPage callback to ensure consistent dependency array
	const setPage = useCallback(
		(page: PageLight) => {
			setCurrentPage(page);
		},
		[setCurrentPage],
	);

	useEffect(() => {
		if (homePageId && pageData) {
			setPage({
				id: homePageId,
				slug: pageData.slug ?? "/",
				title: pageData.title ?? "Home",
			});
		}
	}, [homePageId, pageData, setPage]);
	return (
		<>
			<BuilderHeader />
			<BuilderLeftSidebar />
			{/*<BuilderPreview />*/}
			{/*<BuilderRightSidebar />*/}
			{/*<BuilderFloatingActions />*/}
		</>
	);
}
