import { Card } from './ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from './ui/dropdown-menu'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	MoreHorizontal,
	Clock,
	Trash2,
	Eye,
	Calendar,
	UserIcon,
	Phone,
	RotateCcwIcon,
	CheckIcon,
	XIcon,
	Archive,
	TriangleAlertIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import ViewAppointmentDialog from './ViewAppointmentDialog'
import { useEffect, useState } from 'react'
import AppointmentServices from '@/services/appointmentServices'
import { useToast } from './ui/use-toast'
import { useNotification } from '@/context/NotificationContext'
import { ConfirmationDialog } from './ConfirmationDialog'
import EditAppointmentForm from './forms/EditAppointmentForm'
import useAuth from '@/hooks/useAuth'
import PatientServices from '@/services/patientServices'
import { useNavigate } from 'react-router-dom'
const AppointmentCard = ({ appointment, setRefresh }) => {
	const { auth } = useAuth()
	const { setNotifRefresh } = useNotification()
	// const [view, setView] = useState(false)
	const { toast } = useToast()
	const appointmentServices = new AppointmentServices()
	const [onCancel, setCancel] = useState(false)
	const [restoreDialog, setRestoreDialog] = useState(false)
	const [edit, setEdit] = useState(false)
	const [reason, setReason] = useState('')
	const patientServices = new PatientServices()
	const [patientFound, setPatientFound] = useState()
	const [loading, setLoading] = useState()
	const navigate = useNavigate()
	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const checkForPatientMatch = async () => {
			try {
				const patientMatch = await patientServices.checkForPatientMatch(
					{
						first_name: appointment.first_name,
						last_name: appointment.last_name,
					},
					signal
				)
				console.log(patientMatch)
				setPatientFound(patientMatch)
			} catch (error) {
				console.log(error)
			}
		}
		checkForPatientMatch()
		return () => {
			controller.abort()
		}
	}, [appointment])

	const onAccept = async () => {
		try {
			setLoading(true)
			await appointmentServices.acceptAppointment(
				appointment.appointment_id,
				auth.user.user_id
			)
			toast({
				title: 'Success',
				description: `Appointment accepted!`,
				duration: 3000,
			})
			setRefresh(true)
			setNotifRefresh(true)
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	const onReject = async () => {
		try {
			await appointmentServices.rejectAppointment(
				appointment.appointment_id,
				auth.user.user_id,
				reason
			)
			toast({
				title: 'Rejected',
				variant: 'destructive',
				description: `Appointment rejected`,
				duration: 3000,
			})
			setRefresh(true)
		} catch (e) {
			console.log(e)
		}
	}

	const markAsComplete = async () => {
		try {
			await appointmentServices.markAsComplete(
				appointment.appointment_id,
				auth.user.user_id
			)
			toast({
				title: 'Success',
				description: `Appointment marked as complete`,
				duration: 3000,
			})
			setRefresh(true)
			if (patientFound) {
				navigate(`/patients/profile/${patientFound.patient_id}`)
			} else {
				navigate(
					`/patients/add?first_name=${encodeURIComponent(
						appointment.first_name
					)}&last_name=${encodeURIComponent(
						appointment.last_name
					)}&phone=${encodeURIComponent(
						appointment.phone
					)}&email=${encodeURIComponent(appointment.email)}`
				)
			}
		} catch (e) {
			console.log(e)
		}
	}
	const handleArchive = async () => {
		try {
			await appointmentServices.archiveAppointment(
				appointment.appointment_id,
				auth.user.user_id
			)
			toast({
				title: 'Success',
				description: `Appointment archived`,
				duration: 3000,
			})
			setRefresh(true)
		} catch (e) {
			console.log(e)
		}
	}

	const handleRestore = async () => {
		try {
			await appointmentServices.markAsPending(
				appointment.appointment_id,
				auth.user.user_id
			)
			toast({
				title: 'Success',
				description: `Appointment restored!`,
				duration: 3000,
			})
			setRefresh(true)
		} catch (e) {
			console.log(e)
		}
	}

	const handleCancel = async () => {
		try {
			await appointmentServices.markAsCancelled(
				appointment.appointment_id,
				auth.user.user_id
			)
			toast({
				title: 'Success',
				description: `Appointment cancelled!`,
				duration: 3000,
			})
			setRefresh(true)
		} catch (e) {
			console.log(e)
		}
	}

	const getStatusColor = status => {
		switch (status) {
			case 'Pending':
				return 'bg-yellow-100 text-yellow-800'
			case 'Accepted':
				return 'bg-green-100 text-green-800'
			case 'Rejected':
				return 'bg-red-100 text-red-800'
			case 'Completed':
				return 'bg-blue-100 text-blue-800'
			case 'Missed':
				return 'bg-red-500 text-red-100'
			case 'Cancelled':
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getStatusIcon = status => {
		switch (status) {
			case 'Pending':
				return <RotateCcwIcon className='h-4 w-4' />
			case 'Accepted':
				return <CheckIcon className='h-4 w-4' />
			case 'Rejected':
				return <XIcon className='h-4 w-4' />
			case 'Missed':
				return <XIcon className='h-4 w-4' />
			case 'Completed':
				return <CheckIcon className='h-4 w-4' />
			case 'Cancelled':
				return <XIcon className='h-4 w-4' />
		}
	}

	return (
		<>
			<Card className='hover:bg-secondary/90 cursor-pointer h-auto py-3 px-5 '>
				<div className='flex flex-col md:flex-row lg:flex-row  items-center'>
					<div className='flex flex-row items-center flex-grow'>
						<div className='flex flex-row items-center justify-between'>
							<div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
								<UserIcon className='h-6 w-6 text-gray-600' />
							</div>
							<div className='flex flex-1 flex-col gap-1'>
								<div className='mx-5 flex flex-row gap-2 items-center'>
									<p className='text-md font-medium'>
										{appointment.first_name}{' '}
										{appointment.last_name}
									</p>
									{!patientFound && (
										<span className='text-xs text-yellow-500 flex flex-row'>
											<TriangleAlertIcon className='w-3 h-3 mr-1' />
											Patient not in database!
										</span>
									)}
								</div>
								<div className='flex mx-5 gap-3 flex-row text-muted-foreground '>
									<div className='flex flex-row gap-1 items-center'>
										<Calendar className='w-4 h-4 ' />
										<p className='text-sm'>
											{new Date(
												appointment.appointment_date
											).toLocaleDateString('en-US', {
												month: 'long',
												year: 'numeric',
												day: 'numeric',
											})}
										</p>
									</div>
									<div className='flex flex-row gap-2 items-center'>
										<Clock className='w-4 h-4 ' />
										<p className='text-sm'>
											{new Date(
												appointment.appointment_time_start
											).toLocaleTimeString('en-US', {
												hour12: true,
												hour: 'numeric',
												minute: 'numeric',
											})}
										</p>
									</div>
								</div>
								<div className='mx-5 flex flex-row gap-1 items-center'>
									<Phone className='w-4 h-4 text-green-500 ' />
									<p className='text-sm text-muted-foreground'>
										{appointment.phone}
									</p>
								</div>
							</div>
						</div>
						<div className='flex flex-grow flex-col gap-1'>
							<div className='mx-5 flex flex-row gap-2 items-center'>
								<Badge
									variant='secondary'
									className={`${getStatusColor(
										appointment.status
									)} px-2 py-1 rounded-full flex items-center space-x-1`}
								>
									{getStatusIcon(appointment.status)}
									<span className='capitalize'>
										{appointment.status}
									</span>
								</Badge>
							</div>
							<div className='mx-5 flex flex-row gap-2 items-center'>
								{appointment.status === 'Rejected' ? (
									<span className='text-xs text-muted-foreground'>
										Reason:{' '}
										{appointment.reason_for_rejection}
									</span>
								) : null}
							</div>
						</div>
					</div>
					<div className='flex gap-5 '>
						{appointment.status === 'Pending' && (
							<>
								<Button
									className=' rounded-full'
									onClick={onAccept}
								>
									{loading ? (
										<div>
											<l-ring
												size='20'
												stroke='2'
												bg-opacity='0'
												speed='2'
												color='white'
											></l-ring>
										</div>
									) : (
										'Accept'
									)}
								</Button>
								<Button
									className='w-fit rounded-full'
									onClick={() => setCancel(!onCancel)}
									variant='destructive'
								>
									Reject
								</Button>
							</>
						)}
						{appointment.status === 'Accepted' && (
							<>
								{/* <Button
									className='w-fit rounded-full'
									onClick={markAsComplete}
								>
									Mark as Complete
								</Button> */}
								{patientFound ? (
									<Button
										className='w-fit rounded-full'
										onClick={markAsComplete}
									>
										Go to Patient Profile
									</Button>
								) : (
									<div className='flex flex-col'>
										<Button
											className='w-fit rounded-full'
											onClick={markAsComplete}
										>
											Create Profile for Patient
										</Button>
									</div>
								)}
								<Button
									className='w-fit  rounded-full'
									variant='outline'
									onClick={() => setEdit(!edit)}
								>
									Reschedule
								</Button>
							</>
						)}
						{appointment.status === 'Rejected' && (
							<>
								<Button
									className='w-fit  rounded-full'
									variant='outline'
									onClick={() =>
										setRestoreDialog(!restoreDialog)
									}
								>
									Restore
								</Button>
							</>
						)}
					</div>
					<div className='w-4 h-4 mx-5 flex flex-row gap-2 items-center'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<span className='sr-only'>Open menu</span>
									<MoreHorizontal className='h-4 w-4' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								{/* <DropdownMenuItem
									className='flex items-center'
									onSelect={() => setView(!view)}
								>
									<Eye className='mr-2 h-4 w-4' />
									View
								</DropdownMenuItem> */}
								{appointment.status === 'Pending' ? (
									<DropdownMenuItem
										//onSelect={() => setCancel(!onCancel)}
										className='flex items-center'
										onSelect={() => setEdit(!edit)}
									>
										<Calendar className='mr-2 h-4 w-4' />
										Reschedule
									</DropdownMenuItem>
								) : null}
								{appointment.status !== 'Completed' ? (
									appointment.status === 'Cancelled' ||
									appointment.status === 'Missed' ? (
										<DropdownMenuItem
											onSelect={() =>
												setCancel(!onCancel)
											}
											className='flex items-center text-red-600 focus:text-red-600 focus:bg-red-100'
										>
											<Trash2 className='mr-2 h-4 w-4' />
											Archive
										</DropdownMenuItem>
									) : (
										<DropdownMenuItem
											onSelect={() =>
												setCancel(!onCancel)
											}
											className='flex items-center text-red-600 focus:text-red-600 focus:bg-red-100'
										>
											<Trash2 className='mr-2 h-4 w-4' />
											Cancel
										</DropdownMenuItem>
									)
								) : (
									<DropdownMenuItem
										onSelect={() => setCancel(!onCancel)}
										className='flex items-center '
									>
										<Archive className='mr-2 h-4 w-4' />
										Archive
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
						<Dialog open={edit} onOpenChange={setEdit}>
							<DialogContent className='w-11/12 sm:max-w-xl p-12'>
								<DialogHeader>
									<DialogTitle>
										Reschedule Appointment
									</DialogTitle>
									<DialogDescription>
										Enter the new appointment details below.
										Click save when you're done.
									</DialogDescription>
								</DialogHeader>

								<EditAppointmentForm
									appointment={appointment}
									setRefresh={setRefresh}
									setEdit={setEdit}
								/>
							</DialogContent>
						</Dialog>
						<ConfirmationDialog
							title={
								appointment.status !== 'Completed'
									? `Cancel Appointment`
									: `Archive appointment`
							}
							description={
								appointment.status !== 'Completed'
									? 'Are you sure you want to cancel this appointment.'
									: `Are you sure you want to archive this appointment. This data can still be recovered.`
							}
							confirmText={
								appointment.status !== 'Completed'
									? 'Yes'
									: `Archive`
							}
							onConfirm={
								appointment.status !== 'Completed'
									? appointment.status === 'Pending'
										? onReject
										: appointment.status === 'Cancelled'
										? handleArchive
										: handleCancel
									: handleArchive
							}
							open={onCancel}
							setOpen={setCancel}
							destructive={true}
							reason={
								appointment.status === 'Pending' ||
								appointment.status === 'Accepted'
									? reason
									: null
							}
							reject={
								appointment.status === 'Pending' ||
								appointment.status === 'Accepted'
									? true
									: false
							}
							setReason={
								appointment.status === 'Pending' ||
								appointment.status === 'Accepted'
									? setReason
									: null
							}
						></ConfirmationDialog>
						<ConfirmationDialog
							title='Restore Appointment'
							description='Restoring this appointment will place it in pending.'
							confirmText='Confirm'
							onConfirm={handleRestore}
							open={restoreDialog}
							setOpen={setRestoreDialog}
						></ConfirmationDialog>
					</div>
				</div>
			</Card>
			{/* <ViewAppointmentDialog
				view={view}
				setView={setView}
				appointment={appointment}
				getStatusColor={getStatusColor}
				getStatusIcon={getStatusIcon}
			/> */}
		</>
	)
}

export default AppointmentCard
