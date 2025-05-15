'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, forgotPasswordSchema } from '../zodSchema/loginZodSchema'
import useAuth from '@/hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'

const LoginForm = ({ forgotPassword, setForgotPassword }) => {
	const [attempts, setAttempts] = useState(
		() => parseInt(localStorage.getItem('attempts'), 10) || 3
	)
	const [lockoutTime, setLockoutTime] = useState(() => {
		const lockoutEnd = localStorage.getItem('lockoutEnd')
		return lockoutEnd
			? Math.max(
					0,
					Math.floor((new Date(lockoutEnd) - new Date()) / 1000)
			  )
			: 0
	})
	const {
		persist,
		setPersist,
		setIsSubmitting,
		isSubmitting,
		login,
		onForgotPassword,
	} = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/dashboard'

	const schema = forgotPassword ? forgotPasswordSchema : loginSchema

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			user_name: '',
			password: '',
			email: '',
		},
	})

	useEffect(() => {
		localStorage.setItem('attempts', attempts)
	}, [attempts])

	useEffect(() => {
		if (lockoutTime > 0) {
			const timer = setInterval(() => {
				setLockoutTime(prev => {
					const newTime = prev - 1
					if (newTime <= 0) {
						localStorage.setItem('attempts', 3)
						localStorage.removeItem('lockoutEnd')
					}
					return newTime
				})
			}, 1000)
			return () => clearInterval(timer)
		}
	}, [lockoutTime])

	const onSubmit = async data => {
		try {
			setIsSubmitting(true)
			const logged = await login(data)
			if (logged) {
				localStorage.setItem('attempts', 3)
				setAttempts(3)
				form.reset({})
				navigate(from, { replace: true })
			} else {
				setAttempts(prev => prev - 1)
				form.resetField('password')
				if (attempts - 1 === 0) {
					const endTime = new Date(Date.now() + 30 * 1000) // 30 seconds lockout
					localStorage.setItem('lockoutEnd', endTime)
					setLockoutTime(30)
				}
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleSubmitForgotPassword = async () => {
		setIsSubmitting(true)
		onForgotPassword(form)
	}

	const togglePersist = () => {
		setPersist(prev => !prev)
	}

	useEffect(() => {
		localStorage.setItem('persist', persist)
	}, [persist])

	return (
		<div className='flex flex-col gap-4'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(
						forgotPassword ? handleSubmitForgotPassword : onSubmit
					)}
				>
					<div className='flex flex-col space-y-4'>
						{!forgotPassword ? (
							<>
								<FormField
									control={form.control}
									name='user_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													placeholder='Username'
													{...field}
													className='p-5 rounded-full border-primary/50'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='Password'
													{...field}
													className='p-5 rounded-full border-primary/50'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						) : (
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='Email'
												{...field}
												className='p-5 rounded-full border-primary/50'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormDescription>
							{!forgotPassword
								? 'Enter your username and password'
								: 'Enter your registered email to reset password'}
						</FormDescription>
						{!forgotPassword && (
							<>
								<FormDescription>
									{lockoutTime > 0 ? null : (
										<span>
											{attempts} attempts remaining
										</span>
									)}
								</FormDescription>
								{lockoutTime > 0 && (
									<div className='text-red-500'>
										Please wait {lockoutTime} seconds before
										trying again.
									</div>
								)}
							</>
						)}
						<Button
							className='w-full rounded-full'
							type='submit'
							disabled={
								isSubmitting ||
								(!forgotPassword && lockoutTime > 0)
							}
						>
							{!isSubmitting ? (
								forgotPassword ? (
									'Reset Password'
								) : (
									'Login'
								)
							) : (
								<l-ring
									size='20'
									stroke='2'
									bg-opacity='0'
									speed='2'
									color='white'
								></l-ring>
							)}
						</Button>
					</div>
				</form>
			</Form>
			<div className='flex flex-row justify-between'>
				<div
					className={`flex items-center space-x-2 ${
						forgotPassword && `hidden`
					}`}
				>
					<Checkbox
						id='persist'
						onCheckedChange={togglePersist}
						checked={persist}
					/>
					<Label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Trust this device?
					</Label>
				</div>
				<div>
					<Label className='text-sm underline cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						<span
							onClick={() => setForgotPassword(!forgotPassword)}
						>
							{!forgotPassword ? 'Forgot Password?' : 'Login'}
						</span>
					</Label>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
