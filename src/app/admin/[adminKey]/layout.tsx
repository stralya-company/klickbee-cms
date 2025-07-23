"use client";
import {
	NextIntlClientProvider,
	useLocale,
	useMessages,
	useTranslations,
} from "next-intl";
import { UserProvider } from "@/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/feature/user/stores/storeUser";
import { Sidebar } from "@/components/admin/_partials/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { initializeGlobalZodErrorMap } from "@/lib/zodTranslation";
import { useEffect } from "react";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const currentUser = useUserStore((state) => state.user);
	const queryClient = useQueryClient();
	const messages = useMessages();
	const locale = useLocale();
	const t = useTranslations("AdminLayout");
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	// Initialize global Zod error map with current translations
	useEffect(() => {
		const validationMessages = messages?.Validation || {};
		initializeGlobalZodErrorMap(validationMessages);
	}, [messages]);

	async function logout() {
		const { logout: clearUserStore } = useUserStore.getState();
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					clearUserStore();
					queryClient.invalidateQueries({
						queryKey: ["current_user"],
					});
					router.push(`/admin/${adminKey}/auth/login`);
				},
			},
		});
	}

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
							<Button
								variant="ghost"
								className="mb-4"
								onClick={logout}
							>
								{t("Logout")}
							</Button>
						)}
						{children}
						<Toaster />
					</main>
				</div>
			</NextIntlClientProvider>
		</UserProvider>
	);
}
