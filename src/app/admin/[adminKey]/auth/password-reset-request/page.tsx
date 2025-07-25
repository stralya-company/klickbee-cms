import { useTranslations } from "next-intl";
import ResetPasswordRequestForm from "@/components/admin/auth/password-reset-request/resetPasswordRequestForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordRequestPage() {
	const t = useTranslations("ResetPasswordRequest");

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted w-full">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>{t("ResetPasswordRequest")}</CardTitle>
				</CardHeader>
				<CardContent>
					<ResetPasswordRequestForm />
				</CardContent>
			</Card>
		</div>
	);
}
