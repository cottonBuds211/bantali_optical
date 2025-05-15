import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
const ViewAppointmentDialog = ({
	view,
	setView,
	appointment,
	getStatusIcon,
	getStatusColor,
}) => {
	//console.log(appointment)
	return (
		<div>
			<Dialog
				open={view}
				onOpenChange={isOpen => !isOpen && setView(!view)}
			>
				<DialogContent className='w-11/12 sm:max-w-xl p-12'>
					<DialogHeader>
						<DialogTitle>Appointment Request</DialogTitle>
					</DialogHeader>
					<div className='ml-5'>
						<div className='flex flex-row justify-between'>
							<p className='text-xl font-bold '>
								{new Date(
									appointment.appointment_date
								).toLocaleDateString('en-US', {
									month: 'long',
									year: 'numeric',
									day: 'numeric',
								})}
							</p>
							<Badge
								variant='secondary'
								className={`${getStatusColor(
									appointment.status
								)} px-2 py-1 rounded-full w-fit flex items-center  space-x-1`}
							>
								{getStatusIcon(appointment.status)}
								<span className='capitalize'>
									{appointment.status}
								</span>
							</Badge>
						</div>
						<p className='text-muted-foreground '>
							{new Date(
								appointment.appointment_time_start
							).toLocaleTimeString('en-US', {
								hour12: true,
								hour: 'numeric',
								minute: 'numeric',
							})}
						</p>
					</div>
					<div className='ml-5'>
						<p className='text-md'>
							Details:
							<div className=' ml-5 grid grid-cols-2 text-sm gap-2'>
								<span className='font-semibold'>Name: </span>
								<p>
									<span className='text-muted-foreground'>
										{appointment.first_name}{' '}
										{appointment.last_name}
									</span>
								</p>
								<span className='font-semibold'>Email: </span>
								<p>
									<span className='text-muted-foreground'>
										{appointment.email}
									</span>
								</p>
								<span className='font-semibold'>Phone: </span>
								<p>
									<span className='text-muted-foreground'>
										{appointment.phone}
									</span>
								</p>
							</div>
						</p>
					</div>
					{/* <DialogFooter>
						<div className=' w-full flex justify-between'>
							<Button className='w-[150px]' onClick={onAccept}>
								Accept
							</Button>
							<Button
								className='w-[150px]'
								onClick={onReject}
								variant='destructive'
							>
								Reject
							</Button>
						</div>
					</DialogFooter> */}
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ViewAppointmentDialog
