import LoginForm from '@/components/forms/LoginForm'
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import background from '@/assets/cool.jpg'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
const Login = () => {
	const { loggedIn } = useAuth()
	const [forgotPassword, setForgotPassword] = useState(false)
	console.log(loggedIn)
	// useEffect(() => {
	// 	if (loggedIn && persist) {
	// 		navigate('/dashboard')
	// 	}
	// }, [loggedIn, persist])

	if (loggedIn) {
		return <Navigate to='/dashboard' replace />
	}
	return (
		<>
			<div className='grid lg:grid-cols-5 bg-secondary/90 h-screen w-full items-center'>
				<div className='col-span-3 relative h-full '>
					<img
						src={background}
						className='absolute inset-0 object-cover object-top brightness-75 -z-1 h-full w-80%'
					/>
					<div className='relative flex flex-col justify-between h-full '>
						<h1 className='text-white font-playfair p-10 text-3xl font-bold'>
							BANTALI OPTICAL CLINIC
						</h1>
						<div className='flex justify-center p-20'>
							<h1 className='text-white text-2xl font-thin italic'>
								"The eyes are the windows to the soul. Take care
								of them."
							</h1>
						</div>
					</div>
				</div>

				<div className='col-span-2 flex h-full  justify-center items-center backdrop-brightness-95 '>
					<div className='w-[500px]'>
						<CardHeader>
							<CardTitle>
								<span className='text-5xl font-bold'>
									{!forgotPassword
										? 'Welcome back!'
										: 'Forgot Password'}
								</span>
							</CardTitle>
							<CardDescription>
								{!forgotPassword
									? 'Enter user credentials'
									: 'Enter user email'}
							</CardDescription>
						</CardHeader>

						<CardContent className='pt-10'>
							<LoginForm
								forgotPassword={forgotPassword}
								setForgotPassword={setForgotPassword}
							/>
						</CardContent>
					</div>
				</div>
			</div>
		</>
	)
}
export default Login
