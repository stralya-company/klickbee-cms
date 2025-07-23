"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	UserLoginFormValues,
	userLoginSchema,
} from "@/feature/user/types/userLoginSchema";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
	const router = useRouter();
	const { adminKey } = useParams<{ adminKey: string }>();
	const { setAdminKey } = useAdminKeyStore();
	const queryClient = useQueryClient();

	useEffect(() => {
		setAdminKey(adminKey);
	}, [adminKey, setAdminKey]);

	const t = useTranslations("Login");

	const loginForm = useForm<UserLoginFormValues>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(loginFormValues: UserLoginFormValues) {
		const { email, password } = loginFormValues;

		const { data, error } = await authClient.signIn.email({
			email,
			password,
		});

		if (error) {
			toast.error(t("ConnectionError"));
			return;
		}

		if (data) {
			await queryClient.refetchQueries({ queryKey: ["current_user"] });
			router.push(`/admin/${adminKey}`);
		} else {
			toast.error(t("ConnectionFailed"));
		}
	}

	return (
		<Form {...loginForm}>
			<form
				className="space-y-4"
				onSubmit={loginForm.handleSubmit(onSubmit)}
			>
				<FormField
					control={loginForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("Email")}</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter your email"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={loginForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("Password")}</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder={t("PasswordPlaceholder")}
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
					className="w-full"
					disabled={!loginForm.formState.isValid}
				>
					{loginForm.formState.isSubmitted
						? t("LoggingIn")
						: t("LoginButton")}
				</Button>
			</form>
		</Form>
	);
}
