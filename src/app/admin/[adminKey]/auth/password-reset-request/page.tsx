import ResetPasswordRequestForm from "@/components/admin/auth/reset-password-request/resetPasswordRequestForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordRequestPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-muted w-full">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Réinitialisation du mot de passe</CardTitle>
				</CardHeader>
				<CardContent>
					<ResetPasswordRequestForm />
				</CardContent>
			</Card>
		</div>
	);
}
