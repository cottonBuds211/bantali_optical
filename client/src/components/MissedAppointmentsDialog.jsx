import { useEffect, useState } from 'react'
import { Calendar, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import AppointmentServices from '@/services/appointmentServices'
import useAuth from '@/hooks/useAuth'
const MissedAppointmentsDialog = ({
	missedAppointments,
	showMissedAppointmentsDialog,
	setMissedAppointments,
	setRefresh,
	refresh,
	handleMarkAllAsMissed,
	setShowMissedAppointmentsDialog,
}) => {
	const { auth } = useAuth()
	const appointmentServices = new AppointmentServices()
	console.log(missedAppointments)
	const handleMarkAsCompleted = async id => {
		await appointmentServices.markAsComplete(id, auth.user.user_id)
		setRefresh(true)
		setMissedAppointments(prevAppointments =>
			prevAppointments.filter(appointment => appointment.id !== id)
		)
	}
	useEffect(() => {
		if (missedAppointments.length === 0) {
			setShowMissedAppointmentsDialog(false)
		}
	}, [refresh])
	return (
		<Dialog
			open={showMissedAppointmentsDialog}
			onOpenChange={() =>
				setShowMissedAppointmentsDialog(!showMissedAppointmentsDialog)
			}
		>
			{/* <DialogTrigger asChild>
				<Button variant='outline'>View Missed Appointments</Button>
			</DialogTrigger> */}
			<DialogContent className='w-11/12 sm:max-w-xl p-12'>
				<DialogHeader>
					<DialogTitle>Missed Appointments</DialogTitle>
					<DialogDescription>
						Review and manage appointments that were missed.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='max-h-[60vh] pr-4'>
					{missedAppointments.length === 0 ? (
						<p className='text-center text-muted-foreground py-4'>
							No missed appointments
						</p>
					) : (
						missedAppointments.map(appointment => (
							<Card
								key={appointment.appointment_id}
								className='mb-2 p-5 flex items-center'
							>
								<div className='flex w-full justify-between gap-3'>
									<div>
										<div className='text-md font-inter '>
											{' '}
											{appointment.first_name}{' '}
											{appointment.last_name}
										</div>
										<div className='flex gap-3 font-inter items-center mb-2 text-sm mt-1 text-muted-foreground'>
											<div className='flex flex-row items-center'>
												<Calendar className='mr-2 h-4 w-4' />
												<span>
													{new Date(
														appointment.appointment_date
													).toLocaleDateString(
														'en-US',
														{
															month: 'long',
															year: 'numeric',
															day: 'numeric',
														}
													)}
												</span>
											</div>
											<div className='flex flex-row items-center'>
												<Clock className='mr-2 h-4 w-4' />
												<span>
													{new Date(
														appointment.appointment_time_start
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
										</div>
									</div>
									<div className='flex justify-center items-center'>
										<Button
											onClick={() =>
												handleMarkAsCompleted(
													appointment.appointment_id
												)
											}
											variant='secondary'
											className=' rounded-full'
										>
											Mark as Completed
										</Button>
									</div>
								</div>
							</Card>
						))
					)}
				</ScrollArea>
				<Button className='bg-red-500' onClick={handleMarkAllAsMissed}>
					Mark all as missed
				</Button>
			</DialogContent>
		</Dialog>
	)
}

export default MissedAppointmentsDialog
