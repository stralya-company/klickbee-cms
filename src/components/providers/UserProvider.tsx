import { useCurrentUser } from "@/lib/queries/useUser";
import { useUserStore } from "@/lib/stores/storeUser";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data: user, error } = useCurrentUser();
	const { user: storeUser, setUser } = useUserStore();

	useEffect(() => {
		// Synchronise seulement si la valeur change
		if (
			user &&
			(storeUser?.id !== user.id || storeUser?.email !== user.email)
		) {
			setUser(user);
		}
		if ((!user || error) && storeUser !== null) {
			setUser(null);
		}
	}, [user, error, setUser, storeUser]);

	return <>{children}</>;
}
