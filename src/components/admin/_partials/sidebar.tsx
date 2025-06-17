// components/sidebar.tsx
"use client";

import { Home, Mail, FileText, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export function Sidebar() {
	const { t } = useTranslation();

	const menu = [
		{ href: "/admin/manage/content", icon: Home, label: t("menu.content") },
		{ href: "/admin/manage/contact", icon: Mail, label: t("menu.contact") },
		{ href: "/admin/manage/pages", icon: FileText, label: t("menu.pages") },
		{
			href: "/admin/manage/settings",
			icon: SettingsIcon,
			label: t("menu.settings"),
		},
	];

	return (
		<aside className="w-64 h-screen border-r bg-white p-4 flex flex-col justify-between">
			<div>
				<h1 className="text-lg font-semibold mb-6">Klickbee CMS</h1>
				<nav className="space-y-2">
					{menu.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted text-sm text-muted-foreground transition-colors"
						>
							<item.icon className="h-4 w-4" />
							{item.label}
						</Link>
					))}
				</nav>
			</div>

			<div className="text-xs text-muted-foreground">
				<p className="mb-1">© Klickbee CMS</p>
				<p className="text-[10px]">admin@klickbee.io</p>
			</div>
		</aside>
	);
}
