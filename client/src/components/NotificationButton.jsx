import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { CardTitle } from './ui/card'
import { Bell, CheckCircle2, EllipsisIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { useNotification } from '@/context/NotificationContext'
import NotificationMenuItem from './NotificationMenuItem'
import { ScrollArea } from './ui/scroll-area'
import 'ldrs/chaoticOrbit'

const NotificationButton = () => {
	const {
		notifications,
		markAllNotificationsAsRead,
		loading,
		setNotifRefresh,
	} = useNotification()

	const unRead = notifications?.filter(notification => !notification.is_read)

	const handleClick = () => {
		markAllNotificationsAsRead()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<div className='relative inline-block'>
						<Bell
							className='h-[1.2rem] w-[1.2rem]'
							aria-hidden='true'
						/>
						{unRead.length > 0 && (
							<span className='absolute -top-1.5 '>
								<span className='animate-ping absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-red-500 opacity-50'></span>
								<span
									className='flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold'
									aria-label={`${unRead.length} new notifications`}
								>
									{unRead.length > 99 ? '99+' : unRead.length}
								</span>
							</span>
						)}
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='p-4 min-w-[350px] max-w-[350px]'
			>
				<div className='flex justify-end'></div>
				<div className='flex justify-between mb-2'>
					<p className='font-bold text-lg'>Notifications</p>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant='icon'>
								<EllipsisIcon className='w-5 h-5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								className='flex flex-row gap-2'
								onSelect={handleClick}
							>
								<CheckCircle2 className='w-4 h-4' />
								Mark all as read
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{notifications ? (
					<div>
						<ScrollArea className='max-h-[500px] overflow-y-auto'>
							{loading ? (
								// Loader (shown while waiting for notifications)
								<div className='flex flex-col justify-center items-center p-5'>
									<l-ring
										size='40'
										speed='1.5'
										color='gray'
									></l-ring>
									<Button
										className='rounded-full border-primary text-primary w-[100px] '
										variant='outline'
										onClick={() => setNotifRefresh(true)}
									>
										Retry
									</Button>
								</div>
							) : unRead?.length === 0 ? (
								// No notifications message
								<div className='flex justify-center items-center p-5'>
									<CardTitle className='text-md text-muted-foreground font-normal mb-1'>
										No Notifications
									</CardTitle>
								</div>
							) : (
								// Display notifications if available
								unRead?.map((notification, index) => (
									<NotificationMenuItem
										notification={notification}
										key={notification.id || index}
									/>
								))
							)}
						</ScrollArea>
					</div>
				) : (
					<div className='flex flex-col h-[150px] justify-center items-center gap-4'>
						<span className='text-slate-500 '>
							Something went wrong!
						</span>
						<Button
							className='rounded-full border-primary text-primary w-[100px] '
							variant='outline'
							onClick={() => setNotifRefresh(true)}
						>
							Retry
						</Button>
					</div>
				)}
				<Separator />
				<div className='flex justify-center text-sm mt-2'>
					<Link className='text-blue-600' to={'/notifications'}>
						See all Notification
					</Link>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default NotificationButton
