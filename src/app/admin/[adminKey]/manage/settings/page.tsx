"use client";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export default function AdminSettingsPage() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-muted">
			<Button variant={"default"}>
				<a href={`/admin/${adminKey}/builder/settings`}>
					Builder settings
				</a>
			</Button>

			<h1 className="text-2xl font-bold">Admin Settings Page</h1>
			<p>Manage your admin settings here.</p>
		</div>
	);
}
