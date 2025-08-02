"use client";

import {
	ChevronRight,
	FileText,
	Home,
	LayoutDashboard,
	Mail,
	Settings as SettingsIcon,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LogoutButton from "@/components/admin/_partials/logoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useCurrentUser } from "@/feature/user/queries/useUser";

export function Sidebar() {
	const t = useTranslations("AdminSidebar");
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const pathname = usePathname();
	const { data: user } = useCurrentUser();
	const items = [
		{
			href: `/admin/${adminKey}/manage/dashboard`,
			icon: LayoutDashboard,
			label: t("Dashboard"),
		},
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
			children: [
				{
					href: `/admin/${adminKey}/manage/settings/ai`,
					label: t("AI"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/contact`,
					label: t("Contact"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/users`,
					label: t("Users"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/email`,
					label: t("Email"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/builder`,
					label: t("Builder"),
				},
			],
			icon: SettingsIcon,
			label: t("Settings"),
		},
	];

	return (
		<ShadcnSidebar>
			<SidebarHeader className="p-4 ">
				<div className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 -m-2 cursor-pointer">
					<div className="w-9 h-9 rounded-lg flex items-center justify-center">
						<Image
							alt="Klickbee Logo"
							className="w-full h-full rounded-lg"
							height={36}
							src="/KlickbeeLogo.png"
							width={36}
						/>
					</div>
					<div className="flex flex-col min-w-0 flex-1">
						<p className="text-base font-semibold text-black truncate">
							Klickbee
						</p>
						<p className="text-xs text-muted-foreground truncate">
							KlickBee.com
						</p>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu className="p-4">
					{items.map((item) =>
						item.children ? (
							<Collapsible
								className="group/collapsible"
								defaultOpen
								key={item.label}
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton className="text-black">
											<item.icon className="h-4 w-4" />
											{item.label}
											<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent className="pt-2">
										<SidebarMenuSub>
											{item.children.map((subItem) => (
												<SidebarMenuSubItem
													key={subItem.label}
												>
													<SidebarMenuSubButton
														asChild
														className="text-black data-[active=true]:bg-blue-500 data-[active=true]:text-white"
														data-active={
															pathname ===
															subItem.href
														}
													>
														<Link
															href={subItem.href}
														>
															{subItem.label}
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						) : (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									asChild
									className="text-black data-[active=true]:bg-blue-500 data-[active=true]:text-white"
									data-active={pathname === item.href}
								>
									<Link href={item.href}>
										<item.icon className="h-4 w-4" />
										{item.label}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						),
					)}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="p-4 border-t">
				{user && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 -m-2 cursor-pointer">
								<Avatar className="h-8 w-8">
									<AvatarImage
										alt={user.name || ""}
										src={user.image || undefined}
									/>
									<AvatarFallback className="bg-gray-200">
										{user.name ? (
											user.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()
										) : (
											<User className="h-4 w-4" />
										)}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col min-w-0 flex-1">
									<p className="text-sm font-medium text-black truncate">
										{user.name || "Utilisateur"}
									</p>
									<p className="text-xs text-gray-600 truncate">
										{user.email}
									</p>
								</div>
								<SettingsIcon className="h-4 w-4 text-gray-500" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-64">
							<DropdownMenuItem asChild className="p-0">
								<LogoutButton />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</SidebarFooter>
		</ShadcnSidebar>
	);
}
