"use client";
import { UserProvider } from "@/components/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores/storeUser";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = useUserStore((state) => state.user);

	return (
		<UserProvider>
			{currentUser && (
				<Button variant="ghost" className="w-full justify-start">
					<a href={"/api/auth/logout"}> Logout </a>
				</Button>
			)}
			{children}
		</UserProvider>
	);
}
