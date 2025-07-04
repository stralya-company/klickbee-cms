"use client";
import { NextIntlClientProvider, useMessages, useLocale } from "next-intl";
import { UserProvider } from "@/components/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/feature/user/stores/storeUser";
import { Sidebar } from "@/components/admin/_partials/sidebar";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = useUserStore((state) => state.user);
	const messages = useMessages();
	const locale = useLocale();

	return (
		<UserProvider>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<div className="flex min-h-screen">
					{currentUser && (
						<aside className="w-64 min-h-screen">
							<Sidebar />
						</aside>
					)}
					<main className="flex-1">
						{currentUser && (
							<Button variant="ghost" className="mb-4" asChild>
								<a href="/api/auth/logout">Logout</a>
							</Button>
						)}
						{children}
					</main>
				</div>
			</NextIntlClientProvider>
		</UserProvider>
	);
}
