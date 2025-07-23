"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	UserPasswordResetRequestFormValues,
	userPasswordResetRequestSchema,
} from "@/feature/auth/types/userPasswordResetRequestSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { authClient } from "@/lib/authClient";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export default function ResetPasswordRequestForm() {
	const t = useTranslations("ResetPasswordRequest");
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	const resetPasswordRequestForm =
		useForm<UserPasswordResetRequestFormValues>({
			resolver: zodResolver(userPasswordResetRequestSchema),
			defaultValues: {
				email: "",
			},
		});

	async function onSubmit(
		userPasswordResetRequestFormValues: UserPasswordResetRequestFormValues,
	) {
		try {
			await authClient.requestPasswordReset({
				email: userPasswordResetRequestFormValues.email,
				redirectTo: `/admin/${adminKey}/auth/password-reset`,
			});
			resetPasswordRequestForm.reset();
			toast.success(t("SuccessMessage"));
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : t("ErrorMessage");
			toast.error(errorMessage);
		}
	}
	return (
		<Form {...resetPasswordRequestForm}>
			<form
				className="space-y-4"
				onSubmit={resetPasswordRequestForm.handleSubmit(onSubmit)}
			>
				<FormField
					control={resetPasswordRequestForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("EmailLabel")}</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder={t("EmailPlaceholder")}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full mt-4"
					disabled={
						!resetPasswordRequestForm.formState.isValid ||
						resetPasswordRequestForm.formState.isSubmitting
					}
				>
					{resetPasswordRequestForm.formState.isSubmitting
						? t("Sending")
						: t("SendResetLink")}
				</Button>
			</form>
		</Form>
	);
}
