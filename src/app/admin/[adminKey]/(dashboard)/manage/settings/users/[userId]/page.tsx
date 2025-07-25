import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import UserUpdateForm from "@/components/admin/settings/users/update/userUpdateForm";
import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { userOptions } from "@/lib/react-query/query-options/users/userOptions";

interface PageProps {
	params: {
		userId: string;
	};
}

export default function Page({ params }: PageProps) {
	const t = useTranslations("SettingsUsers");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(userOptions(params.userId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					subtitle={t("UpdateUserSubtitle")}
					title={t("UpdateUser")}
				/>
				<div className="p-12">
					<UserUpdateForm userId={params.userId} />
				</div>
			</section>
		</HydrationBoundary>
	);
}
