import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectValue,
	SelectContent,
} from '../ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

import UserServices from '@/services/usersServices'
import userSchema from '../zodSchema/userFormSchema'
import useAuth from '@/hooks/useAuth'

const EditUserForm = ({ user, setRefresh, setEditUserDialog }) => {
	const { auth } = useAuth()
	const userServices = new UserServices()
	const { toast } = useToast()

	const userForm = useForm({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: user.name,
			user_name: user.user_name,
			email: user.email,
			role: user.role,
			password: user.password,
			confirm_password: user.password,
		},
	})
	const onSubmit = async data => {
		console.log(data)
		try {
			const updatedUser = await userServices.editUsers(data, user.user_id)
			setRefresh(true)
			setEditUserDialog(false)
			toast({
				title: 'Success',
				description: `${updatedUser.name} edited`,
				duration: 3000,
			})
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Name of user'
									{...field}
									className='col-span'
									onChange={e => {
										const value = e.target.value
										if (/^[A-Za-z]*$/.test(value)) {
											field.onChange(value) // Only update if input is valid
										}
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={userForm.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Email of user'
									type='email'
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
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder='Role' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Admin'>
											Admin
										</SelectItem>
										<SelectItem value='Staff'>
											Staff
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={userForm.control}
					name='user_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Username'
									{...field}
									className='col-span'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={userForm.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Password'
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
					name='confirm_password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Confirm Password'
									type='password'
									{...field}
									className='col-span'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<div className='flex justify-end'>
					<Button type='submit'>Edit User</Button>
				</div>
			</form>
		</Form>
	)
}

export default EditUserForm
