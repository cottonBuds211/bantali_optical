import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { z } from 'zod'
import UserServices from '@/services/usersServices'
const ChangeUserPasswordForm = ({
	setChangePasswordDialog,
	setRefresh,
	userId,
}) => {
	const userServices = new UserServices()
	const { toast } = useToast()
	console.log(userId)
	const changePasswordSchema = z
		.object({
			old_password: z
				.string()
				.min(1, { message: 'Old password is required' }),
			new_password: z
				.string()
				.min(8, {
					message: 'New password must be at least 8 characters long',
				})
				.regex(/[A-Z]/, {
					message:
						'New password must contain at least one uppercase letter',
				})
				.regex(/[a-z]/, {
					message:
						'New password must contain at least one lowercase letter',
				})
				.regex(/[0-9]/, {
					message: 'New password must contain at least one digit',
				}),
			confirm_new_password: z.string(),
		})
		.refine(data => data.new_password === data.confirm_new_password, {
			message: 'New password and confirm new password must match',
			path: ['confirm_new_password'],
		})

	const userForm = useForm({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			old_password: '',
			new_password: '',
			confirm_new_password: '',
		},
	})
	const onSubmit = async data => {
		console.log(data)
		try {
			const response = await userServices.changeUserPassword(data, userId)
			setRefresh(true)
			setChangePasswordDialog(false)
			toast({
				title: 'Success',
				description: `Password changed!`,
				duration: 3000,
			})
			console.log(response)
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: error.response?.data.error,
				duration: 3000,
			})
		}
	}
	return (
		<Form {...userForm}>
			<form
				onSubmit={userForm.handleSubmit(onSubmit)}
				className='space-y-2'
			>
				<FormField
					control={userForm.control}
					name='old_password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Old Password'
									type='password'
									{...field}
									className='col-span'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={userForm.control}
					name='new_password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='New Password'
									type='password'
									{...field}
									className='col-span'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={userForm.control}
					name='confirm_new_password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Confirm New Password'
									type='password'
									{...field}
									className='col-span'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end'>
					<Button type='submit'>Confirm</Button>
				</div>
			</form>
		</Form>
	)
}

export default ChangeUserPasswordForm
