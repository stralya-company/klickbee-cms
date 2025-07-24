"use client";

import { FileText, Home, Mail, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export function Sidebar() {
	const t = useTranslations("AdminSidebar");
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const menu = [
		{
			href: `/admin/${adminKey}/manage/content`,
			icon: Home,
			label: t("Content"),
		},
		{
			href: `/admin/${adminKey}/manage/contact`,
			icon: Mail,
			label: t("Contact"),
		},
		{
			href: `/admin/${adminKey}/manage/pages`,
			icon: FileText,
			label: t("Pages"),
		},
		{
			href: `/admin/${adminKey}/manage/settings`,
			icon: SettingsIcon,
			label: t("Settings"),
		},
	];

	return (
		<aside className="w-64 h-screen border-r bg-white p-4 flex flex-col justify-between">
			<div>
				<h1 className="text-lg font-semibold mb-6">{t("Title")}</h1>
				<nav className="space-y-2">
					{menu.map((item) => (
						<Link
							className="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted text-sm text-muted-foreground transition-colors"
							href={item.href}
							key={item.href}
						>
							<item.icon className="h-4 w-4" />
							{item.label}
						</Link>
					))}
				</nav>
			</div>

			<div className="text-xs text-muted-foreground">
				<p className="mb-1">{t("Copyright")}</p>
				<p className="text-[10px]">{t("Email")}</p>
			</div>
		</aside>
	);
}
