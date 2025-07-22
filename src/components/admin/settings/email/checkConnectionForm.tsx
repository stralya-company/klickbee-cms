"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendEmail } from "@/feature/send-email/queries/useSendEmail";
import {
	checkConnectionSchema,
	CheckConnectionSchema,
} from "@/feature/settings/types/emailSettingsSchema";

export default function CheckConnectionForm() {
	const checkConnectionForm = useForm<CheckConnectionSchema>({
		resolver: zodResolver(checkConnectionSchema),
	});
	const sendEmail = useSendEmail();

	const onCheckConnectionSubmit = async (data: CheckConnectionSchema) => {
		try {
			const result = await sendEmail.mutateAsync({
				to: data.to,
				subject: data.subject,
				text: data.text,
			});
			toast.success(result.message);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error";
			toast.error(errorMessage);
		}
	};

	return (
		<Form {...checkConnectionForm}>
			<form
				onSubmit={checkConnectionForm.handleSubmit(
					onCheckConnectionSubmit,
				)}
				className="p-4 w-1/2 space-y-4"
			>
				<FormField
					control={checkConnectionForm.control}
					name="to"
					render={({ field }) => (
						<FormItem>
							<FormLabel>To</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="To"
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={checkConnectionForm.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Subject"
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={checkConnectionForm.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Text</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Text"
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={sendEmail.isPending}>
					{sendEmail.isPending ? "Sending..." : "Check connection"}
				</Button>
			</form>
		</Form>
	);
}
