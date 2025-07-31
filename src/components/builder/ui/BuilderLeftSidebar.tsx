import BuilderSearchComponent from "./_partials/Sidebars/Left/Search";
import BuilderTabContent from "./_partials/Sidebars/Left/TabContent";
import BuilderTabSwitcher from "./_partials/Sidebars/Left/TabSwitcher";

export default function BuilderLeftSidebar() {
	return (
		<div className="w-64 bg-white divide-y border-r border-t border-gray-200 h-full flex flex-col">
			<BuilderTabSwitcher />
			<BuilderSearchComponent />
			<BuilderTabContent />
		</div>
	);
}
