import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import ActionButton from "@/components/admin/settings/users/actionButton";
import Pagination from "@/components/admin/settings/users/pagination";
import SearchBar from "@/components/admin/settings/users/searchBar";
import UsersTable from "@/components/admin/settings/users/usersTable";
import { allUsersOptions } from "@/feature/user/options/allUsersOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default function Page() {
	const t = useTranslations("SettingsUsers");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allUsersOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					subtitle={t("ManageUsersSubtitle")}
					title={t("ManageUsers")}
				/>
				<div className="p-12 space-y-4">
					<div className="flex items-center justify-between gap-4">
						<SearchBar />
						<ActionButton />
					</div>
					<UsersTable />
					<Pagination />
				</div>
			</section>
		</HydrationBoundary>
	);
}
