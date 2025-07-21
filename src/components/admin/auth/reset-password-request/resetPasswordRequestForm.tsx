"use client";

import { useState } from "react";
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

export default function ResetPasswordRequestForm() {
	const [loading, setLoading] = useState(false);
	const resetPasswordRequestForm = useForm<UserPasswordResetRequestSchema>({
		resolver: zodResolver(userPasswordResetRequestSchema),
	});

	function onSubmit(data: UserPasswordResetRequestSchema) {
		setLoading(true);
		fetch("/api/auth/reset-password-request", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to send reset password request");
				}
				return response.json();
			})
			.then(() => {
				alert("Demande de réinitialisation du mot de passe envoyée avec succès.");
				resetPasswordRequestForm.reset();
			})
			.catch((error) => {
				alert(`Erreur: ${error.message}`);
			})
			.finally(() => {
				setLoading(false);
			});
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
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Entrez votre adresse e-mail"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full mt-4">
					Envoyer la demande de réinitialisation
				</Button>
			</form>
		</Form>
	);
}
