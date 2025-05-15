import useAuth from '@/hooks/useAuth'
import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '../ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
const Account = () => {
	const { auth } = useAuth()
	return (
		<div>
			<div className='flex flex-col gap-10 container'>
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>Account details.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex flex-col gap-2 text-sm'>
							<div>
								<p className=''>
									<span className='font-bold'>
										Account name:
									</span>{' '}
									<span>{auth.user.name}</span>
								</p>
							</div>
							<div>
								<p className=''>
									<span className='font-bold'>Email:</span>{' '}
									<span>{auth.user.email}</span>
								</p>
							</div>
							<div>
								<p className=''>
									<span className='font-bold'>Role:</span>{' '}
									<span>{auth.user.role}</span>
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Update Information</CardTitle>
						<CardDescription>
							Update your personal details here.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='fullName'>Account Name</Label>
							<Input
								id='fullName'
								placeholder='John Doe'
								value={auth.user.name}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								value={auth.user.email}
								placeholder='john@example.com'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save Changes</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Security</CardTitle>
						<CardDescription>
							Manage your account security settings.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='currentPassword'>
								Current Password
							</Label>
							<Input id='currentPassword' type='password' />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='newPassword'>New Password</Label>
							<Input id='newPassword' type='password' />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>
								Confirm New Password
							</Label>
							<Input id='confirmPassword' type='password' />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Change Password</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
export default Account
