"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useTranslations } from "next-intl";

export default function LoginPage({
	params,
}: {
	params: Promise<{ adminKey: string }>;
}) {
	const paramsSync = React.use(params);
	const adminKey = paramsSync.adminKey;
	const { setAdminKey } = useAdminKeyStore();
	const t = useTranslations("Login");

	useEffect(() => {
		setAdminKey(adminKey);
	}, [adminKey, setAdminKey]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				const data = await res.json();
				setError(data.message || t("ConnectionError"));
				setLoading(false);
				return;
			} else {
				window.location.href = `/admin/${adminKey}`;
			}
		} catch (err: Error | unknown) {
			if (err instanceof Error) {
				setError(`${err.message}`);
			} else {
				setError(t("ConnectionFailed"));
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted w-full">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>{t("AdminLogin")}</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label htmlFor="email">{t("Email")}</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="admin@example.com"
								required
							/>
						</div>
						<div>
							<Label htmlFor="password">{t("Password")}</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder={t("PasswordPlaceholder")}
								required
							/>
						</div>
						{error && (
							<div className="text-sm text-destructive">
								{error}
							</div>
						)}
						<Button
							type="submit"
							className="w-full"
							disabled={loading}
						>
							{loading ? t("LoggingIn") : t("LoginButton")}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
