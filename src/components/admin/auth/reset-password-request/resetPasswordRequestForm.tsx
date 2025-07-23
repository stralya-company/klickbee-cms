'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { usePasswordResetRequest } from '@/feature/user/queries/usePasswordResetRequest'
import {
	UserPasswordResetRequestFormValues,
	userPasswordResetRequestSchema,
} from '@/feature/user/types/userPasswordResetRequestSchema'

export default function ResetPasswordRequestForm() {
	const t = useTranslations('ResetPasswordRequest')

	const passwordResetRequestMutation = usePasswordResetRequest()

	const resetPasswordRequestForm =
		useForm<UserPasswordResetRequestFormValues>({
			defaultValues: {
				email: '',
			},
			resolver: zodResolver(userPasswordResetRequestSchema),
		})

	async function onSubmit(data: UserPasswordResetRequestFormValues) {
		try {
			const result = await passwordResetRequestMutation.mutateAsync(data)
			resetPasswordRequestForm.reset()
			toast.success(result.message)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : t('ErrorMessage')
			toast.error(errorMessage)
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
							<FormLabel>{t('EmailLabel')}</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder={t('EmailPlaceholder')}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-full mt-4"
					disabled={passwordResetRequestMutation.isPending}
					type="submit"
				>
					{passwordResetRequestMutation.isPending
						? t('Sending')
						: t('SendResetLink')}
				</Button>
			</form>
		</Form>
	)
}
