import BuilderTabPagesCollections from "@/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Pages/Collections";
import BuilderTabPagesPages from "@/builder/components/ui/_partials/Sidebars/Left/_partials/Tabs/_partials/Pages/Pages";

export default function BuilderTabPages() {
	return (
		<>
			<BuilderTabPagesPages />
			<BuilderTabPagesCollections />
		</>
	);
}
