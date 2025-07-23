'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminKeyStore } from '@/feature/admin-key/stores/storeAdminKey'

export default function LoginPage({
	params,
}: {
	params: Promise<{ adminKey: string }>
}) {
	const paramsSync = React.use(params)
	const adminKey = paramsSync.adminKey
	const { setAdminKey } = useAdminKeyStore()
	const t = useTranslations('Login')

	useEffect(() => {
		setAdminKey(adminKey)
	}, [adminKey, setAdminKey])
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const res = await fetch('/api/auth/login', {
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			})

			if (!res.ok) {
				const data = await res.json()
				setError(data.message || t('ConnectionError'))
				setLoading(false)
				return
			} else {
				window.location.href = `/admin/${adminKey}`
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(`${err.message}`)
			} else {
				setError(t('ConnectionFailed'))
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted w-full">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>{t('AdminLogin')}</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<Label htmlFor="email">{t('Email')}</Label>
							<Input
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="admin@example.com"
								required
								type="email"
								value={email}
							/>
						</div>
						<div>
							<Label htmlFor="password">{t('Password')}</Label>
							<Input
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder={t('PasswordPlaceholder')}
								required
								type="password"
								value={password}
							/>
						</div>
						{error && (
							<div className="text-sm text-destructive">
								{error}
							</div>
						)}
						<Button
							className="w-full"
							disabled={loading}
							type="submit"
						>
							{loading ? t('LoggingIn') : t('LoginButton')}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
