"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const emailSettingsSchema = z.object({
	emailHost: z.string(),
	emailSender: z.string(),
	emailUsername: z.string(),
	emailPassword: z.string().optional(),
});

type EmailSettingsSchema = z.infer<typeof emailSettingsSchema>;

export default function EmailSettingsPage() {
	const emailHost = useSetting("emailHost");
	const emailSender = useSetting("emailSender");
	const emailUsername = useSetting("emailUsername");
	const setSetting = useSetSetting();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EmailSettingsSchema>({
		resolver: zodResolver(emailSettingsSchema),
	});
	const [emailSettings, setEmailSettings] =
		useState<EmailSettingsSchema | null>(null);

	useEffect(() => {
		if (emailHost.data && emailSender.data && emailUsername.data) {
			setEmailSettings({
				emailHost: emailHost.data.value ?? "",
				emailSender: emailSender.data.value ?? "",
				emailUsername: emailUsername.data.value ?? "",
			});
			reset({
				emailHost: emailHost.data.value ?? "",
				emailSender: emailSender.data.value ?? "",
				emailUsername: emailUsername.data.value ?? "",
			});
		}
	}, [emailHost.data, emailSender.data, emailUsername.data, reset]);

	if (
		emailHost.isLoading ||
		emailSender.isLoading ||
		emailUsername.isLoading
	) {
		return <p className="p-4">Chargement...</p>;
	}

	const onSubmit = (data: EmailSettingsSchema) => {
		const keys = Object.keys(data) as (keyof EmailSettingsSchema)[];

		keys.forEach((key) => {
			const currentValue = emailSettings?.[key];
			if (data[key] && data[key] !== currentValue) {
				setSetting.mutate({
					key,
					value: data[key] as string,
				});
			}
		});
	};

	return (
		<div className="w-full">
			<h1 className="p-4">Email Settings Page</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="p-4 w-xl">
				<Label htmlFor="emailHost">Email Host</Label>
				<Input type="text" id="emailHost" {...register("emailHost")} />
				{errors.emailHost && (
					<p className="text-red-500">{errors.emailHost.message}</p>
				)}
				<Label htmlFor="emailSender">Email Sender</Label>
				<Input
					type="text"
					id="emailSender"
					{...register("emailSender")}
				/>
				{errors.emailSender && (
					<p className="text-red-500">{errors.emailSender.message}</p>
				)}
				<Label htmlFor="emailUsername">Email Username</Label>
				<Input
					type="text"
					id="emailUsername"
					{...register("emailUsername")}
				/>
				{errors.emailUsername && (
					<p className="text-red-500">
						{errors.emailUsername.message}
					</p>
				)}
				<Label htmlFor="emailPassword">Email Password</Label>
				<Input
					type="password"
					id="emailPassword"
					{...register("emailPassword")}
				/>
				{errors.emailPassword && (
					<p className="text-red-500">
						{errors.emailPassword.message}
					</p>
				)}
				<Button type="submit" disabled={isSubmitting}>
					Save
				</Button>
			</form>
		</div>
	);
}
