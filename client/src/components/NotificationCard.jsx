import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationServices from '@/services/notificationsServices'
import AppointmentServices from '@/services/appointmentServices'
import {
	DropdownMenuItem,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from './ui/dropdown-menu'
import { EllipsisIcon, X, Check } from 'lucide-react'
import { Card, CardContent, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useNotification } from '@/context/NotificationContext'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import placeholder from '@/assets/bg-gradient.png'
const NotificationCard = ({ notification }) => {
	const { setNotifRefresh } = useNotification()
	const [appointment, setAppointment] = useState([])
	const appointmentServices = new AppointmentServices()
	const notificationServices = new NotificationServices()
	const navigate = useNavigate()

	const handleClick = async () => {
		try {
			await notificationServices.markAsRead(notification.notification_id)
			setNotifRefresh(true)
			if (location.pathname !== '/appointments') {
				navigate('/appointments')
			}
			// else {
			// 	// Reload the current page if already on '/appointments'
			// 	window.location.reload()
			// }
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		const getAppointment = async () => {
			try {
				const appointment = await appointmentServices.getAppointment(
					notification.appointment_id
				)
				//console.log(notification.appointment_id)
				setAppointment(appointment)
			} catch (e) {
				console.log(e)
			}
		}
		getAppointment()
	}, [])

	const formattedDate =
		appointment?.appointment_date &&
		new Date(appointment.appointment_date).toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric',
			day: 'numeric',
		})

	return (
		<div>
			{appointment && (
				<Card
					className='flex flex-grow justify-between items-center p-5 cursor-pointer hover:bg-secondary/90 '
					onClick={handleClick}
				>
					<div className='flex flex-row items-center gap-4'>
						<Avatar className='h-12 w-12'>
							<AvatarImage src={placeholder} />
							<AvatarFallback>{}</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className='text-md mb-1'>
								{notification.message}
							</CardTitle>
							<CardContent className='w-fit pl-3 pb-0'>
								<div className='text-sm text-muted-foreground '>
									<p>
										{appointment.first_name}{' '}
										{appointment.last_name}
									</p>
									<p>{formattedDate}</p>
								</div>
							</CardContent>
						</div>
					</div>

					<div className='flex flex-row items-center'>
						<div>
							<DropdownMenu
								asChild
								placement='bottom-end'
								onSelect={e => e.preventDefault()}
							>
								<DropdownMenuTrigger>
									<Button
										className='rounded-full'
										variant='icon'
									>
										<EllipsisIcon className='w-4 h-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem className='flex flex-row gap-2'>
										<Check className='h-4 w-4' />
										Mark as Read
									</DropdownMenuItem>
									<DropdownMenuItem className='flex flex-row gap-2'>
										<X className='h-4 w-4 text-red-600 ' />
										Remove Notification
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						{!notification.is_read ? (
							<span className='flex items-center justify-center h-3 w-3 rounded-full bg-red-500 text-white text-xs font-bold'></span>
						) : null}
					</div>
				</Card>
			)}
		</div>
	)
}

export default NotificationCard
