import { useEffect, useState } from 'react'
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'
import UserServices from '@/services/usersServices'
const LogItem = ({ log }) => {
	const [user, setUser] = useState()
	const userServices = new UserServices()
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getUser = async () => {
			try {
				const user = await userServices.getUser(log.user_id, signal)
				isMounted && setUser(user)
			} catch (error) {
				console.log(error)
			}
		}
		getUser()
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])
	return (
		<div key={log.log_id} className='flex items-center mb-4 last:mb-0'>
			<Avatar className='h-9 w-9'>
				<AvatarImage
					src={`https://avatar.vercel.sh/${log.user}.png`}
					alt={log.user}
				/>
				<AvatarFallback>{}</AvatarFallback>
			</Avatar>
			<div className='ml-4 space-y-1'>
				<p className='text-sm font-medium leading-none'>{user?.name}</p>
				<p className='text-sm text-muted-foreground'>{log.details}</p>
				<p className='text-xs text-muted-foreground'>
					{new Date(log.action_date).toLocaleDateString('en-US', {
						month: 'long',
						year: 'numeric',
						day: 'numeric',
					})}
				</p>
			</div>
		</div>
	)
}

export default LogItem
