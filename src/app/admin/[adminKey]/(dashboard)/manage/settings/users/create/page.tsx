import { useTranslations } from "next-intl";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import UserCreateForm from "@/components/admin/settings/users/create/userCreateForm";

export default function Page() {
	const t = useTranslations("SettingsUsers");

	return (
		<section className="flex flex-col gap-4">
			<DashboardTitle
				subtitle={t("CreateUserSubtitle")}
				title={t("CreateUser")}
			/>
			<div className="p-12 space-y-4">
				<UserCreateForm />
			</div>
		</section>
	);
}
