import { useTranslations } from "next-intl";
import LoginForm from "@/components/admin/auth/login/loginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
	const t = useTranslations("Login");

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted w-full">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>{t("AdminLogin")}</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
