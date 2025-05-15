import NotificationCard from '@/components/NotificationCard'
import PageWrapper from '@/components/PageWrapper'
import {
	Card,
	CardTitle,
	CardContent,
	CardHeader,
	CardDescription,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNotification } from '@/context/NotificationContext'
import LinkButton from '@/components/LinkButton'
import { ChevronLeft } from 'lucide-react'

const Notifications = () => {
	const { notifications } = useNotification()
	const readNotfications = notifications?.filter(
		notification => notification.is_read
	)
	const unreadNotfications = notifications?.filter(
		notification => !notification.is_read
	)
	return (
		<PageWrapper
			title={'Notifications'}
			button={<LinkButton icon={<ChevronLeft />} />}
		>
			<div className='flex justify-center'>
				<Tabs defaultValue='unread' className='w-3/5'>
					<TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
						<TabsTrigger
							value='unread'
							className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
						>
							Unread
						</TabsTrigger>
						<TabsTrigger
							value='all-notification'
							className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
						>
							All Notifications
						</TabsTrigger>
					</TabsList>
					<TabsContent value='unread'>
						<Card>
							<CardHeader>
								<CardTitle>Unread Notifications</CardTitle>
								{/* <CardDescription>
									View pending appointments here.
								</CardDescription> */}
							</CardHeader>
							<CardContent className='space-y-2'>
								{notifications?.length === 0 ? (
									<p>No notifications</p>
								) : (
									unreadNotfications?.map(
										(notification, index) =>
											notification && (
												<NotificationCard
													key={index}
													notification={notification}
												/>
											)
									)
								)}
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value='all-notification'>
						<Card>
							<CardHeader>
								<CardTitle>All Notifications</CardTitle>
								{/* <CardDescription>
									View pending appointments here.
								</CardDescription> */}
							</CardHeader>
							<CardContent className='space-y-2'>
								{notifications?.length === 0 ? (
									<p className='text-md'>No notifications</p>
								) : (
									readNotfications?.map(
										(notification, index) =>
											notification && (
												<NotificationCard
													key={index}
													notification={notification}
												/>
											)
									)
								)}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</PageWrapper>
	)
}

export default Notifications
