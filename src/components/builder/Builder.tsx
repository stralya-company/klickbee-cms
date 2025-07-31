"use client";
import BuilderFloatingActions from "@/components/builder/ui/BuilderFloatingActions";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";

export default function BuilderComponent() {
	useCurrentPageStore.setState({ currentPage: "/" });
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
