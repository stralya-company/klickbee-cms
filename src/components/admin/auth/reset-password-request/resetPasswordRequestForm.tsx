"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	UserPasswordResetRequestSchema,
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

	const resetPasswordRequestForm = useForm<UserPasswordResetRequestSchema>({
		resolver: zodResolver(userPasswordResetRequestSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: UserPasswordResetRequestSchema) {
		try {
			const result = await passwordResetRequestMutation.mutateAsync(data);
			if (!result.success) {
				toast.error(t("ErrorMessage"));
				return;
			}

			resetPasswordRequestForm.reset();
			toast.success(t("SuccessMessage"));
		} catch {
			toast.error(t("ErrorMessage"));
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
