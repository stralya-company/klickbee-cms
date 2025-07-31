import BuilderTabComponents from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/Components";
import BuilderTabLayers from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/Layers";
import BuilderTabPages from "@/components/builder/ui/_partials/Sidebars/Left/_partials/Tabs/Pages";

export default function BuilderTabContent({
	activeTab,
}: {
	activeTab: string;
}) {
	if (activeTab === "Pages") return <BuilderTabPages />;
	if (activeTab === "Layers") return <BuilderTabLayers />;
	if (activeTab === "Components") return <BuilderTabComponents />;
	return null;
}
