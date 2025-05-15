import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import PageWrapper from '@/components/PageWrapper'
import { useEffect, useState } from 'react'
import AppointmentServices from '@/services/appointmentServices'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarIcon, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useSidebar } from '@/context/SideBarContext'
import { Badge } from '@/components/ui/badge'

const Calendar = () => {
	const [acceptedAppointments, setAcceptedAppointments] = useState([])
	const appointmentServices = new AppointmentServices()
	const navigate = useNavigate()
	const { setIsSelected, setTopBarTitle } = useSidebar()
	const { toast } = useToast()

	const handleClick = () => {
		navigate('/appointments?tab=accepted')
		setIsSelected('Appointments')
		setTopBarTitle('Appointments')
	}

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal
		const getAcceptedAppointments = async () => {
			try {
				const acceptedAppointments =
					await appointmentServices.getAcceptedAppointments({
						signal,
					})

				acceptedAppointments.sort((a, b) =>
					a.appointment_date.localeCompare(b.appointment_date)
				)

				isMounted && setAcceptedAppointments(acceptedAppointments)
			} catch (err) {
				console.error(err)
				if (err.code !== 'ERR_CANCELED') {
					toast({
						title: 'Session Expired',
						description:
							'Your session has expired please log-in again!',
					})
					navigate('/login', {
						state: { from: location },
						replace: true,
					})
				}
			}
		}
		getAcceptedAppointments()
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])

	const getAppointmentStatus = start => {
		const appointmentDate = new Date(start)
		const today = new Date()
		today.setHours(0, 0, 0, 0) // Clear time for comparison

		if (appointmentDate < today) return 'missed'
		if (appointmentDate.toDateString() === today.toDateString())
			return 'current'
		return 'future'
	}

	const events = acceptedAppointments
		.map(appointment => ({
			id: appointment.appointment_id,
			title: `${appointment.first_name} ${appointment.last_name}`,
			start: appointment.appointment_time_start,
			end: appointment.appointment_time_end,
			status: getAppointmentStatus(appointment.appointment_time_start),
		}))
		.sort((a, b) => {
			const statusPriority = {
				current: 1,
				future: 2,
				missed: 3,
			}
			return statusPriority[a.status] - statusPriority[b.status]
		})

	return (
		<PageWrapper title={'Calendar'}>
			<div className='flex flex-col lg:flex-row gap-6 h-full '>
				{/* Appointments list */}
				<Card className='w-full lg:w-[400px] xl:w-[500px] flex flex-col h-full'>
					<CardHeader>
						<CardTitle className='text-xl flex flex-row justify-between'>
							<div>Upcoming Appointments</div>
							<div>{events.length}</div>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className='max-h-[60vh] lg:max-h-[70vh] overflow-y-auto px-4 flex flex-col '>
							{events.length === 0 ? (
								<p>No upcoming appointments</p>
							) : (
								events.map(event => (
									<Card
										key={event.id}
										className={`w-full max-w-sm my-2 hover:bg-secondary/90 cursor-pointer ${
											event.status === 'missed'
												? 'bg-red-100'
												: event.status === 'current'
												? 'bg-green-100'
												: 'bg-blue-100'
										}`}
										onClick={handleClick}
									>
										<CardContent className='p-5'>
											<div className='flex items-center mb-1'>
												<div className='flex w-full items-center justify-between'>
													<p className='font-medium '>
														{event.title}
													</p>
													{event.status ===
													'missed' ? (
														<Badge className='bg-red-500'>
															Missed
														</Badge>
													) : null}
													{event.status ===
													'current' ? (
														<Badge className='bg-green-500'>
															Today
														</Badge>
													) : null}
												</div>
											</div>
											<div className='flex items-center text-sm'>
												<CalendarIcon className='mr-2 h-4 w-4 opacity-70' />
												<span className='text-muted-foreground text-sm'>
													{new Date(
														event.start
													).toLocaleDateString(
														'en-US',
														{
															year: 'numeric',
															month: 'short',
															day: 'numeric',
														}
													)}
												</span>
											</div>
											<div className='flex items-center text-sm'>
												<Clock className='mr-2 h-4 w-4 opacity-70' />
												<span className='text-muted-foreground text-sm'>
													{new Date(
														event.start
													).toLocaleTimeString(
														'en-US',
														{
															hour12: true,
															hour: 'numeric',
															minute: 'numeric',
														}
													)}
												</span>
											</div>
										</CardContent>
									</Card>
								))
							)}
						</ScrollArea>
					</CardContent>
				</Card>

				{/* FullCalendar */}
				<div className='flex-grow w-full'>
					<FullCalendar
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							interactionPlugin,
							listPlugin,
						]}
						initialView='dayGridMonth'
						headerToolbar={{
							start: 'prev,next',
							center: 'title',
							end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
						}}
						buttonText={{
							month: 'Month',
							week: 'Week',
							day: 'Day',
							list: 'List',
						}}
						titleFormat={{
							year: 'numeric',
							month: 'long',
						}}
						events={events}
						eventClassNames={({ event }) => {
							const status = event.extendedProps.status
							if (status === 'missed')
								return 'bg-red-500 text-white'
							if (status === 'current')
								return 'bg-green-500 text-white'
							if (status === 'future')
								return 'bg-blue-500 text-white'
						}}
						selectable={true}
						height={750}
						contentHeight={750}
						aspectRatio={3}
					/>
				</div>
			</div>
		</PageWrapper>
	)
}

export default Calendar
