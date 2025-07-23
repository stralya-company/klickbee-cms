'use client'
import { useEffect } from 'react'
import { useCurrentUser } from '@/feature/user/queries/useUser'
import { useUserStore } from '@/feature/user/stores/storeUser'

export function UserProvider({ children }: { children: React.ReactNode }) {
	const { data: user, error, isLoading } = useCurrentUser()
	const { user: storeUser, setUser } = useUserStore()

	useEffect(() => {
		if (isLoading) return
		if (
			user &&
			(!storeUser ||
				storeUser.id !== user.id ||
				storeUser.email !== user.email)
		) {
			setUser(user)
		}
		if ((!user || error) && storeUser !== null) {
			setUser(null)
		}
	}, [user, error, isLoading, setUser, storeUser])

	if (isLoading) {
		return <div>Chargement...</div>
	}

	return <>{children}</>
}
