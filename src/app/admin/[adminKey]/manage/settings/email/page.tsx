"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSendEmail } from "@/feature/send-email/queries/useSendEmail";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	checkConnectionSchema,
	CheckConnectionSchema,
	emailSettingsSchema,
	EmailSettingsSchema,
} from "@/feature/settings/types/emailSettingsSchema";

export default function EmailSettingsPage() {
	const emailHost = useSetting("emailHost");
	const emailPort = useSetting("emailPort");
	const emailSecure = useSetting("emailSecure");
	const emailSender = useSetting("emailSender");
	const emailUsername = useSetting("emailUsername");
	const setSetting = useSetSetting();
	const emailSettingsForm = useForm<EmailSettingsSchema>({
		resolver: zodResolver(emailSettingsSchema),
	});
	const checkConnectionForm = useForm<CheckConnectionSchema>({
		resolver: zodResolver(checkConnectionSchema),
	});
	const [emailSettings, setEmailSettings] =
		useState<EmailSettingsSchema | null>(null);
	const sendEmail = useSendEmail();

	useEffect(() => {
		if (
			emailHost.data &&
			emailPort.data &&
			emailSecure.data &&
			emailSender.data &&
			emailUsername.data
		) {
			setEmailSettings({
				emailHost: emailHost.data.value ?? "",
				emailPort: Number(emailPort.data.value ?? ""),
				emailSecure: emailSecure.data.value === "true",
				emailSender: emailSender.data.value ?? "",
				emailUsername: emailUsername.data.value ?? "",
			});
			emailSettingsForm.reset({
				emailHost: emailHost.data.value ?? "",
				emailPort: Number(emailPort.data.value ?? ""),
				emailSecure: emailSecure.data.value === "true",
				emailSender: emailSender.data.value ?? "",
				emailUsername: emailUsername.data.value ?? "",
			});
		}
	}, [
		emailHost.data,
		emailPort.data,
		emailSecure.data,
		emailSender.data,
		emailUsername.data,
		emailSettingsForm,
	]);

	if (
		emailHost.isLoading ||
		emailPort.isLoading ||
		emailSecure.isLoading ||
		emailSender.isLoading ||
		emailUsername.isLoading
	) {
		return <p className="p-4">Loading...</p>;
	}

	const onEmailSettingsSubmit = (data: EmailSettingsSchema) => {
		const keys = Object.keys(data) as (keyof EmailSettingsSchema)[];

		keys.forEach((key) => {
			const currentValue = emailSettings?.[key];
			if (data[key] !== "" && data[key] !== currentValue) {
				setSetting.mutate({
					key,
					value: String(data[key]),
				});
			}
		});
	};

	const onCheckConnectionSubmit = (data: CheckConnectionSchema) => {
		sendEmail.mutate({
			to: data.to,
			subject: data.subject,
			text: data.text,
		});
	};

	return (
		<div className="w-full">
			<h1 className="p-4">Email Settings Page</h1>
			<div className="flex gap-3">
				<form
					onSubmit={emailSettingsForm.handleSubmit(
						onEmailSettingsSubmit,
					)}
					className="p-4 w-1/2"
				>
					<Label htmlFor="emailHost">Email Host</Label>
					<Input
						type="text"
						id="emailHost"
						{...emailSettingsForm.register("emailHost")}
					/>
					{emailSettingsForm.formState.errors.emailHost && (
						<p className="text-red-500">
							{
								emailSettingsForm.formState.errors.emailHost
									.message
							}
						</p>
					)}
					<Label htmlFor="emailPort">Email Port</Label>
					<Input
						type="number"
						id="emailPort"
						{...emailSettingsForm.register("emailPort", {
							valueAsNumber: true,
						})}
					/>
					{emailSettingsForm.formState.errors.emailPort && (
						<p className="text-red-500">
							{
								emailSettingsForm.formState.errors.emailPort
									.message
							}
						</p>
					)}
					<Label htmlFor="emailSecure">SSL/TLS</Label>
					<Input
						type="checkbox"
						id="emailSecure"
						{...emailSettingsForm.register("emailSecure")}
					/>
					{emailSettingsForm.formState.errors.emailSecure && (
						<p className="text-red-500">
							{
								emailSettingsForm.formState.errors.emailSecure
									.message
							}
						</p>
					)}
					<Label htmlFor="emailSender">Email Sender</Label>
					<Input
						type="email"
						id="emailSender"
						{...emailSettingsForm.register("emailSender")}
					/>
					{emailSettingsForm.formState.errors.emailSender && (
						<p className="text-red-500">
							{
								emailSettingsForm.formState.errors.emailSender
									.message
							}
						</p>
					)}
					<Label htmlFor="emailUsername">Email Username</Label>
					<Input
						type="text"
						id="emailUsername"
						{...emailSettingsForm.register("emailUsername")}
					/>
					{emailSettingsForm.formState.errors.emailUsername && (
						<p className="text-red-500">
							{
								emailSettingsForm.formState.errors.emailUsername
									.message
							}
						</p>
					)}
					<Label htmlFor="emailPassword">Email Password</Label>
					<Input
						type="password"
						id="emailPassword"
						{...emailSettingsForm.register("emailPassword")}
					/>
					{emailSettingsForm.formState.errors.emailPassword && (
						<p className="text-red-500">
							{
								emailSettingsForm.formState.errors.emailPassword
									.message
							}
						</p>
					)}
					<Button
						type="submit"
						disabled={emailSettingsForm.formState.isSubmitting}
					>
						Save
					</Button>
				</form>
				<form
					onSubmit={checkConnectionForm.handleSubmit(
						onCheckConnectionSubmit,
					)}
					className="p-4 w-1/2"
				>
					<Label htmlFor="to">To</Label>
					<Input
						type="text"
						id="to"
						{...checkConnectionForm.register("to")}
					/>
					{checkConnectionForm.formState.errors.to && (
						<p className="text-red-500">
							{checkConnectionForm.formState.errors.to.message}
						</p>
					)}
					<Label htmlFor="subject">Subject</Label>
					<Input
						type="text"
						id="subject"
						{...checkConnectionForm.register("subject")}
					/>
					{checkConnectionForm.formState.errors.subject && (
						<p className="text-red-500">
							{
								checkConnectionForm.formState.errors.subject
									.message
							}
						</p>
					)}
					<Label htmlFor="text">Text</Label>
					<Input
						type="text"
						id="text"
						{...checkConnectionForm.register("text")}
					/>
					{checkConnectionForm.formState.errors.text && (
						<p className="text-red-500">
							{checkConnectionForm.formState.errors.text.message}
						</p>
					)}
					<Button
						type="submit"
						disabled={checkConnectionForm.formState.isSubmitting}
					>
						Check connection
					</Button>
				</form>
			</div>
		</div>
	);
}
