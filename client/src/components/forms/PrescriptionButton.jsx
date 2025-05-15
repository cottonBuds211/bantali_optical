import { Button } from '../ui/button'
import { CirclePlus } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { useState } from 'react'
import PrescriptionForm from './PrescriptionForm'

const PrescriptionButton = ({ setSuccess }) => {
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => {
		if (isOpen) {
			setIsOpen(!isOpen)
		} else {
			setIsOpen(true)
		}
	}
	return (
		<div className='w-full'>
			<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
				<DialogTrigger className='w-full'>
					<Button
						className='gap-2 w-full border-dotted'
						variant='outline'
						onClick={handleOpen}
					>
						<icon>
							<CirclePlus />
						</icon>
						<p>Generate Prescription</p>
					</Button>
				</DialogTrigger>
				<DialogContent
					onInteractOutside={e => {
						e.preventDefault()
					}}
					className='w-11/12 sm:max-w-xl p-12'
				>
					<DialogHeader>
						<DialogTitle>Prescription Form</DialogTitle>
						<DialogDescription>
							Create prescription for patient
						</DialogDescription>
					</DialogHeader>
					<PrescriptionForm
						setSuccess={setSuccess}
						setIsOpen={setIsOpen}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default PrescriptionButton
