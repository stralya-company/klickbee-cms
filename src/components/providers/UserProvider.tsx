"use client";
import { useCurrentUser } from "@/lib/queries/useUser";
import { useUserStore } from "@/lib/stores/storeUser";
import { useEffect } from "react";

export function UserProvider({ children }: { children: React.ReactNode }) {
	const { data: user, error, isLoading } = useCurrentUser();
	const { user: storeUser, setUser } = useUserStore();

	useEffect(() => {
		if (isLoading) return;
		if (
			user &&
			(!storeUser ||
				storeUser.id !== user.id ||
				storeUser.email !== user.email)
		) {
			setUser(user);
		}
		if ((!user || error) && storeUser !== null) {
			setUser(null);
		}
	}, [user, error, isLoading, setUser, storeUser]);

	if (isLoading) {
		return <div>Chargement...</div>;
	}

	return <>{children}</>;
}
