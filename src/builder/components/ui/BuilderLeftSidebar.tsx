import BuilderSearchComponent from "@/builder/components/ui/_partials/Sidebars/Left/Search";
import BuilderTabContent from "@/builder/components/ui/_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "@/builder/components/ui/_partials/Sidebars/Left/TabSwitcher";

export default function BuilderLeftSidebar() {
	return (
		<>
			<BuilderTabSwitcher />
			<BuilderSearchComponent />
			<BuilderTabContent />
		</>
	);
}
