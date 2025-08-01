import BuilderComponent from "@/components/builder/Builder";
import { getPageById } from "@/feature/page/lib/pages";
import { PageLight } from "@/feature/page/types/page";
import { getSetting } from "@/feature/settings/lib/settings";

export default async function BuilderPage() {
	// Fetch homepage ID from settings
	const homePageIdSetting = await getSetting("current_homepage_id");
	const homePageId = homePageIdSetting
		? Number(homePageIdSetting)
		: undefined;

	// Fetch page data if we have a homepage ID
	let pageData: PageLight | undefined;
	if (homePageId) {
		pageData = (await getPageById(homePageId)) as PageLight;
	}

	return <BuilderComponent homePageId={homePageId} pageData={pageData} />;
}
