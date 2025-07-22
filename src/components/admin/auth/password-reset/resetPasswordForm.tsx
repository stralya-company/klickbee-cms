"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { usePasswordReset } from "@/feature/user/queries/usePasswordReset";
import {
	UserPasswordResetFormValues,
	userPasswordResetSchema,
} from "@/feature/user/types/userPasswordResetSchema";
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
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ResetPasswordForm() {
	const router = useRouter();

	const { adminKey } = useParams<{ adminKey: string }>();

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const t = useTranslations("ResetPassword");

	const passwordResetMutation = usePasswordReset();

	const resetPasswordForm = useForm<UserPasswordResetFormValues>({
		resolver: zodResolver(userPasswordResetSchema),
		defaultValues: {
			token: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	async function onSubmit(data: UserPasswordResetFormValues) {
		try {
			const result = await passwordResetMutation.mutateAsync(data);
			resetPasswordForm.reset();
			toast.success(result.message);
			router.push(`/admin/${adminKey}/auth/login`);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : t("ErrorMessage");
			toast.error(errorMessage);
		}
	}

	useEffect(() => {
		if (token) resetPasswordForm.setValue("token", token);
	}, [resetPasswordForm, token]);

	return (
		<Form {...resetPasswordForm}>
			<form
				className="space-y-4"
				onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
			>
				<FormField
					control={resetPasswordForm.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("NewPasswordLabel")}</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder={t("NewPasswordPlaceholder")}
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={resetPasswordForm.control}
					name="confirmNewPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t("NewConfirmPasswordLabel")}
							</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder={t(
										"NewConfirmPasswordPlaceholder",
									)}
									{...field}
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
					disabled={passwordResetMutation.isPending}
				>
					{passwordResetMutation.isPending
						? t("Resetting")
						: t("ResetButton")}
				</Button>
			</form>
		</Form>
	);
}
