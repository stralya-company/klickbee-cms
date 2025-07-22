"use client";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import Link from "next/link";

export default function AdminSettingsPage() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-muted">
			<div className="flex gap-3 mb-3">
				<Button variant={"default"} asChild>
					<a href={`/admin/${adminKey}/builder/settings`}>
						Builder settings
					</a>
				</Button>
				<Button variant={"default"} asChild>
					<Link href={`/admin/${adminKey}/manage/settings/email`}>
						Email settings
					</Link>
				</Button>
			</div>
			<h1 className="text-2xl font-bold">Admin Settings Page</h1>
			<p>Manage your admin settings here.</p>
		</div>
	);
}
