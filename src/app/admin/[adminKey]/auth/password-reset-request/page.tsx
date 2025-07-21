import ResetPasswordRequestForm from "@/components/admin/auth/reset-password-request/resetPasswordRequestForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

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
