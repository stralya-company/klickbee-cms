import EmailSettingsForm from "@/components/admin/settings/email/emailSettingsForm";
import CheckConnectionForm from "@/components/admin/settings/email/checkConnectionForm";

export default function EmailSettingsPage() {
	return (
		<div className="w-full">
			<h1 className="p-4">Email Settings Page</h1>
			<div className="flex gap-3">
				<EmailSettingsForm />
				<CheckConnectionForm />
			</div>
		</div>
	);
}
