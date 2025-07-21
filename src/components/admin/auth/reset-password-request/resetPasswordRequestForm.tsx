"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	UserPasswordResetRequestFormValues,
	userPasswordResetRequestSchema,
} from "@/feature/user/types/userPasswordResetRequestSchema";
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
import { usePasswordResetRequest } from "@/feature/user/queries/usePasswordResetRequest";
import { toast } from "sonner";

export default function ResetPasswordRequestForm() {
	const t = useTranslations("ResetPasswordRequest");

	const passwordResetRequestMutation = usePasswordResetRequest();

	const resetPasswordRequestForm =
		useForm<UserPasswordResetRequestFormValues>({
			resolver: zodResolver(userPasswordResetRequestSchema),
			defaultValues: {
				email: "",
			},
		});

	async function onSubmit(data: UserPasswordResetRequestFormValues) {
		try {
			const result = await passwordResetRequestMutation.mutateAsync(data);
			resetPasswordRequestForm.reset();
			toast.success(result.message);
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
					disabled={passwordResetRequestMutation.isPending}
				>
					{passwordResetRequestMutation.isPending
						? t("Sending")
						: t("SendResetLink")}
				</Button>
			</form>
		</Form>
	);
}
