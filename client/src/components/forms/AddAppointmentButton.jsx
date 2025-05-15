import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import AppointmentFormRequest from './AppointmentFormRequest'
import { ScrollArea } from '../ui/scroll-area'
const AddAppointmentButton = ({ setRefresh }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className='mr-2 h-4 w-4' /> Create An Appointment
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 sm:max-w-xl p-12'>
				<DialogHeader>
					<DialogTitle>Create an appointment</DialogTitle>
					<DialogDescription>
						Enter the details of the appointment below. Click submit
						when you're done.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='max-h-[60vh] overflow-y-hidden'>
					<AppointmentFormRequest
						setRefresh={setRefresh}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default AddAppointmentButton
