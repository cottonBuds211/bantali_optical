import React, { useEffect, useState } from 'react'
import { TableRow, TableCell } from '../ui/table'
import UserServices from '@/services/usersServices'

const LogRow = ({ log }) => {
	const userServices = new UserServices()
	const [user, setUser] = useState()
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
		<TableRow key={log.log_id}>
			<TableCell className='font-medium'>{user?.name}</TableCell>
			<TableCell>{log.action}</TableCell>
			<TableCell>{log.details}</TableCell>
			<TableCell>
				{new Date(log.action_date).toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric',
					day: 'numeric',
				})}{' '}
			</TableCell>
			<TableCell>
				<span className='text-muted-foreground'>
					{new Date(log.action_date).toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
					})}
				</span>
			</TableCell>
		</TableRow>
	)
}

export default LogRow
