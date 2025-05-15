import PageWrapper from '@/components/PageWrapper'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs'
import { CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import AppointmentCard from '@/components/AppointmentCard'
import AppointmentServices from '@/services/appointmentServices'
import { useEffect, useState } from 'react'
import { useNotification } from '@/context/NotificationContext'
import { useSearchParams } from 'react-router-dom'
import { Search, SearchX } from 'lucide-react'
import PaginationPage from '@/components/PaginationPage'
import AddAppointmentButton from '@/components/forms/AddAppointmentButton'
const Appointments = () => {
	const [searchParams] = useSearchParams()
	const state = searchParams.get('tab')
	const [isLoading, setLoading] = useState(true)
	const { notifRefresh } = useNotification()
	const [refresh, setRefresh] = useState(false)
	const appointmentServices = new AppointmentServices()
	const [pendingAppointments, setPendingAppointments] = useState([])
	const [acceptedAppointments, setAcceptedAppointments] = useState([])
	const [rejectedAppointments, setRejectedAppointments] = useState([])

	const [historyAppointments, setHistoryAppointments] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(10)
	const [searchTerm, setSearchTerm] = useState('')
	const lastPostIndex = currentPage * postPerPage
	const firstPostIndex = lastPostIndex - postPerPage
	const currentPosts = historyAppointments?.slice(
		firstPostIndex,
		lastPostIndex
	)
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal
		const getPendingAppointments = async () => {
			try {
				const pendingAppointments =
					await appointmentServices.getPendingAppointments({ signal })

				pendingAppointments.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				)

				isMounted && setPendingAppointments(pendingAppointments)
			} catch (e) {
				console.error(e)
			} finally {
				isMounted && setLoading(false)
			}
		}
		const getAcceptedAppointments = async () => {
			try {
				const acceptedAppointments =
					await appointmentServices.getAcceptedAppointments({
						signal,
					})

				acceptedAppointments.sort((a, b) =>
					a.appointment_time_start.localeCompare(
						b.appointment_time_start
					)
				)

				isMounted && setAcceptedAppointments(acceptedAppointments)
			} catch (e) {
				console.error(e)
			} finally {
				isMounted && setLoading(false)
			}
		}
		const getHistoryAppointments = async () => {
			try {
				const historyAppointments =
					await appointmentServices.getHistoryAppointments(signal)

				historyAppointments.sort((a, b) =>
					b.appointment_time_start.localeCompare(
						a.appointment_time_start
					)
				)
				isMounted && setHistoryAppointments(historyAppointments)
			} catch (e) {
				console.error(e)
			} finally {
				isMounted && setLoading(false)
			}
		}
		const getRejectedAppointments = async () => {
			try {
				const rejectedAppointments =
					await appointmentServices.getRejectedAppointments(signal)

				historyAppointments.sort((a, b) =>
					b.updatedAt.localeCompare(a.updatedAt)
				)
				isMounted && setRejectedAppointments(rejectedAppointments)
			} catch (e) {
				console.error(e)
			} finally {
				isMounted && setLoading(false)
			}
		}
		getHistoryAppointments()
		getAcceptedAppointments()
		getPendingAppointments()
		getRejectedAppointments()

		return () => {
			setRefresh(false)
			isMounted = false
			controller.abort()
		}
	}, [refresh, notifRefresh])

	return (
		<PageWrapper title={'Appointments'}>
			<Tabs
				defaultValue={state ? state : 'pending'}
				className='min-h-full'
			>
				<TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
					<TabsTrigger
						value='pending'
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
					>
						Appointment Lists
					</TabsTrigger>
					<TabsTrigger
						value='accepted'
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none '
					>
						Accepted Appointments
					</TabsTrigger>
					<TabsTrigger
						value='rejected'
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none '
					>
						Rejected Appointments
					</TabsTrigger>
					<TabsTrigger
						value='history'
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
					>
						Appointments History
					</TabsTrigger>
				</TabsList>
				<TabsContent value='pending'>
					<CardHeader>
						<div className='flex flex-row justify-between'>
							<CardTitle className='text-lg font-semibold'>
								Pending Appointments
							</CardTitle>
							<AddAppointmentButton setRefresh={setRefresh} />
						</div>
					</CardHeader>
					<CardContent className='space-y-2'>
						{!isLoading ? (
							pendingAppointments.length > 0 ? (
								pendingAppointments.map(
									(pending, index) =>
										pending && (
											<AppointmentCard
												key={index}
												appointment={pending}
												setRefresh={setRefresh}
											/>
										)
								)
							) : (
								<div className='flex flex-col mt-20 items-center text-muted-foreground'>
									<Search size={50} strokeWidth={2} />
									<p>No Pending Appointments</p>
								</div>
							)
						) : (
							<div className='h-[200px] flex justify-center items-center'>
								<l-ring
									size='40'
									stroke='5'
									bg-opacity='0'
									speed='2'
									color='gray'
								></l-ring>
							</div>
						)}
					</CardContent>
				</TabsContent>

				<TabsContent value='accepted'>
					<CardHeader>
						<CardTitle className='text-lg font-semibold'>
							Accepted Appointments
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 flex-grow'>
						{!isLoading ? (
							acceptedAppointments.length > 0 ? (
								acceptedAppointments.map(
									(booked, index) =>
										booked && (
											<AppointmentCard
												key={index}
												appointment={booked}
												setRefresh={setRefresh}
											/>
										)
								)
							) : (
								<div className='flex flex-col items-center mt-20 text-muted-foreground'>
									<Search size={50} strokeWidth={2} />
									<p>No Accepted Appointments</p>
								</div>
							)
						) : (
							<div className='h-[200px] flex justify-center items-center'>
								<l-ring
									size='40'
									stroke='5'
									bg-opacity='0'
									speed='2'
									color='gray'
								></l-ring>
							</div>
						)}
					</CardContent>
				</TabsContent>
				<TabsContent value='rejected'>
					<CardHeader>
						<CardTitle className='text-lg font-semibold'>
							Rejected Appointments
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 flex-grow'>
						{!isLoading ? (
							rejectedAppointments.length > 0 ? (
								rejectedAppointments.map(
									(appointments, index) =>
										appointments && (
											<AppointmentCard
												key={index}
												appointment={appointments}
												setRefresh={setRefresh}
											/>
										)
								)
							) : (
								<div className='flex flex-col items-center mt-20 text-muted-foreground'>
									<Search size={50} strokeWidth={2} />
									<p>No Rejected Appointments</p>
								</div>
							)
						) : (
							<div className='h-[200px] flex justify-center items-center'>
								<l-ring
									size='40'
									stroke='5'
									bg-opacity='0'
									speed='2'
									color='gray'
								></l-ring>
							</div>
						)}
					</CardContent>
				</TabsContent>
				<TabsContent value='history'>
					<CardHeader>
						<CardTitle className='text-lg font-semibold'>
							History of Appointments
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 h-full'>
						{!isLoading ? (
							historyAppointments.length > 0 ? (
								currentPosts.map(
									(history, index) =>
										history && (
											<AppointmentCard
												key={index}
												appointment={history}
												setRefresh={setRefresh}
											/>
										)
								)
							) : (
								<div className='flex flex-col items-center mt-20 text-muted-foreground'>
									<Search size={50} strokeWidth={2} />
									<p>No Booked Appointments</p>
								</div>
							)
						) : (
							<div className='h-[200px] flex justify-center items-center'>
								<l-ring
									size='40'
									stroke='5'
									bg-opacity='0'
									speed='2'
									color='gray'
								></l-ring>
							</div>
						)}
						<div>
							{currentPosts.length > 0 ? (
								historyAppointments.length > postPerPage ? (
									<PaginationPage
										totalPosts={historyAppointments?.length}
										postPerPage={postPerPage}
										setCurrentPage={setCurrentPage}
										currentPage={currentPage}
									/>
								) : null
							) : null}
						</div>
					</CardContent>
				</TabsContent>
			</Tabs>
		</PageWrapper>
	)
}

export default Appointments
