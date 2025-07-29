import BuilderFloatingActions from "@/builder/components/ui/BuilderFloatingActions";
import BuilderHeader from "@/builder/components/ui/BuilderHeader";
import BuilderLeftSidebar from "@/builder/components/ui/BuilderLeftSidebar";
import BuilderPreview from "@/builder/components/ui/BuilderPreview";
import BuilderRightSidebar from "@/builder/components/ui/BuilderRightSidebar";

export default function BuilderComponent() {
	return (
		<>
			<BuilderHeader />
			<BuilderLeftSidebar />
			<BuilderPreview />
			<BuilderRightSidebar />
			<BuilderFloatingActions />
		</>
	);
}
