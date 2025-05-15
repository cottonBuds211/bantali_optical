import PageWrapper from '@/components/PageWrapper'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Calendar as CalendarIcon, Activity } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import AppointmentServices from '@/services/appointmentServices'
import { useState, useEffect } from 'react'
import VisitServices from '@/services/visitServices'
import PatientServices from '@/services/patientServices'
import { isSameDay } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import { Link, useNavigate } from 'react-router-dom'
import LogServices from '@/services/logsServices'
import LogItem from '@/components/settings/LogItem'
import { useSidebar } from '@/context/SideBarContext'
import useAuth from '@/hooks/useAuth'
import MissedAppointmentsDialog from '@/components/MissedAppointmentsDialog'
const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
}

const Dashboard = () => {
	const { auth } = useAuth()
	const [refresh, setRefresh] = useState(false)
	const [showMissedAppointmentsDialog, setShowMissedAppointmentsDialog] =
		useState(false)
	const { setTopBarTitle, setIsSelected } = useSidebar()
	const [appointments, setAppointments] = useState([])
	const [acceptedAppointments, setAcceptedAppointments] = useState([])
	const [missedAppointments, setMissedAppointments] = useState([])
	const [visits, setVisits] = useState([])
	const [patients, setPatients] = useState([])
	const [logs, setLogs] = useState([])
	const visitServices = new VisitServices()
	const appointmentServices = new AppointmentServices()
	const patientServices = new PatientServices()
	const logServices = new LogServices()
	const { toast } = useToast()
	const navigate = useNavigate()
	const [data, setData] = useState([
		{ name: 'Jan', value: 0 },
		{ name: 'Feb', value: 0 },
		{ name: 'Mar', value: 0 },
		{ name: 'Apr', value: 0 },
		{ name: 'May', value: 0 },
		{ name: 'Jun', value: 0 },
		{ name: 'Jul', value: 0 },
		{ name: 'Aug', value: 0 },
		{ name: 'Sep', value: 0 },
		{ name: 'Oct', value: 0 },
		{ name: 'Nov', value: 0 },
		{ name: 'Dec', value: 0 },
	])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getVisits = async () => {
			try {
				const result = await visitServices.getCompletedVisits(signal)
				setVisits(result)

				// Filter visits and count by month
				const visitCountByMonth = new Array(12).fill(0) // Array to store counts for each month (Jan to Dec)

				result.forEach(visit => {
					const visitDate = new Date(visit.visitation_date)
					const visitMonth = visitDate.getMonth() // Months are 0-indexed: 0 = Jan, 11 = Dec
					visitCountByMonth[visitMonth] += 1
				})

				// Map the counts to the data array
				const updatedData = data.map((item, index) => ({
					...item,
					value: visitCountByMonth[index], // Set the count for each month
				}))

				setData(updatedData)
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

		getVisits()

		return () => {
			controller.abort()
		}
	}, [])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getAppointments = async () => {
			const result = await appointmentServices.getHistoryAppointments(
				signal
			)

			setAppointments(result)
		}
		const getAcceptedAppointments = async () => {
			const result = await appointmentServices.getAcceptedAppointments(
				signal
			)
			const today = result.filter(appointment => {
				return isSameDay(
					new Date(appointment.appointment_date),
					new Date()
				)
			})
			const missed = result.filter(appointment => {
				const today = new Date()
				today.setHours(0, 0, 0, 0)
				return today > new Date(appointment.appointment_date)
			})
			//console.log(today)
			setMissedAppointments(missed)
			setAcceptedAppointments(today)
		}

		try {
			getAppointments()
			getAcceptedAppointments()
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

		//console.log(appointments)
		return () => {
			setRefresh(false)
			controller.abort()
		}
	}, [refresh])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getPatients = async () => {
			try {
				const result = await patientServices.getAllPatients(signal)
				setPatients(result)
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
		getPatients()

		return () => {
			controller.abort()
		}
	}, [])
	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getLogs = async () => {
			try {
				const logs = await logServices.getLogs(signal)
				logs.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

				setLogs(logs)
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
		getLogs()

		return () => {
			controller.abort()
		}
	}, [])
	useEffect(() => {
		if (missedAppointments.length > 0) {
			setShowMissedAppointmentsDialog(true)
		} else {
			//setShowMissedAppointmentsDialog(false)
		}
	}, [missedAppointments])

	const handleMarkAllAsMissed = async () => {
		const missedIds = missedAppointments.map(
			appointment => appointment.appointment_id
		)
		for (const id of missedIds) {
			try {
				await appointmentServices.markAsMissed(id, auth.user.user_id)
				toast({
					title: 'Success',
					description: 'Appointments marked as missed!',
				})
				setShowMissedAppointmentsDialog(false)
			} catch (error) {
				console.error(
					`Failed to mark appointment ${id} as missed:`,
					error
				)
				toast({
					title: 'Failed',
					variant: 'desctructive',
					description: 'Failed to mark appointments as missed!',
				})
			}
		}
	}
	return (
		<PageWrapper title={'Dashboard'}>
			<div className='grid grid-cols-1  lg:grid-cols-4 gap-4'>
				<div className='lg:col-span-3 space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Total Patients
								</CardTitle>
								<Users className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{patients.length}
								</div>
								<p className='text-xs text-muted-foreground'>
									Total number of patients
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Appointments
								</CardTitle>
								<CalendarIcon className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{appointments.length}
								</div>
								<p className='text-xs text-muted-foreground'>
									Total number of appointments
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Total Visits
								</CardTitle>
								<Activity className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{visits.length}
								</div>
								<p className='text-xs text-muted-foreground'>
									Total number of visits
								</p>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Patient Visits Over Time</CardTitle>
						</CardHeader>
						<CardContent className='h-[300px] '>
							<ResponsiveContainer width='100%' height='100%'>
								<ChartContainer config={chartConfig}>
									<AreaChart data={data}>
										<CartesianGrid />
										<XAxis
											dataKey='name'
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={value =>
												value.slice(0, 3)
											}
										/>
										<YAxis />
										<ChartTooltip
											cursor={false}
											content={
												<ChartTooltipContent indicator='dot' />
											}
										/>
										<Area
											dataKey='value'
											type='linear'
											fillOpacity={0.4}
											strokeWidth={2}
										/>
									</AreaChart>
								</ChartContainer>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>
								<span className='text-xl'>
									Today's Appointments
								</span>
							</CardTitle>
						</CardHeader>
						<ScrollArea className='h-[200px]'>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow className='rounded-t-full'>
											<TableHead>Name</TableHead>
											<TableHead>Time</TableHead>
											<TableHead>Type</TableHead>
										</TableRow>
									</TableHeader>

									<TableBody className='[&>*:nth-child(odd)]:bg-secondary/90'>
										{acceptedAppointments?.map(
											appointment => (
												<TableRow
													key={
														appointment?.appointment_id
													}
												>
													<TableCell>
														{
															appointment?.first_name
														}{' '}
														{appointment?.last_name}
													</TableCell>
													<TableCell>
														{new Date(
															appointment?.appointment_time_start
														).toLocaleTimeString(
															'en-US',
															{
																hour12: true,
																hour: 'numeric',
																minute: 'numeric',
															}
														)}
													</TableCell>
													<TableCell>
														Check-up
													</TableCell>
												</TableRow>
											)
										)}
									</TableBody>
								</Table>
								{acceptedAppointments.length <= 0 ? (
									<div className='flex justify-center text-muted-foreground text-xl mt-10'>
										No Appointments Today
									</div>
								) : null}
							</CardContent>
						</ScrollArea>
					</Card>
				</div>
				<div className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle>
								<span className='text-xl'>Calendar</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='flex justify-center items-center'>
								<Calendar
									mode='single'
									captionLayout='dropdown-buttons'
									fromYear={new Date().getFullYear()}
									toYear={new Date().getFullYear()}
								/>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className='flex justify-between items-center'>
								<CardTitle>
									<span className='text-lg'>
										Recent Activity
									</span>
								</CardTitle>
								{auth.user.role === 'Admin' ? (
									<Link
										className='text-blue-600 text-sm'
										to={'/settings/logs'}
										onClick={() => {
											setTopBarTitle('Settings')
											setIsSelected('Settings')
										}}
									>
										All logs
									</Link>
								) : null}
							</div>
						</CardHeader>
						<CardContent>
							<ScrollArea className='h-[270px]'>
								{logs.slice(0, 10).map((log, index) => (
									<LogItem log={log} key={index} />
								))}
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</div>
			<MissedAppointmentsDialog
				setMissedAppointments={setMissedAppointments}
				missedAppointments={missedAppointments}
				showMissedAppointmentsDialog={showMissedAppointmentsDialog}
				setRefresh={setRefresh}
				handleMarkAllAsMissed={handleMarkAllAsMissed}
				setShowMissedAppointmentsDialog={
					setShowMissedAppointmentsDialog
				}
				refresh={refresh}
			/>
		</PageWrapper>
	)
}

export default Dashboard
