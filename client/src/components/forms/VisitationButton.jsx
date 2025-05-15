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
import VisitationForm from './VisitationForm'
import { useContext, useState } from 'react'
import { PatientContext } from '../PatientProfile'

const VisitationButton = ({ setSuccess, success }) => {
	const { patient, setSuccessPatient } = useContext(PatientContext)
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
						<p>Add Visitation</p>
					</Button>
				</DialogTrigger>
				<DialogContent
					onInteractOutside={e => {
						e.preventDefault()
					}}
					className='w-11/12 sm:max-w-xl p-12'
				>
					<DialogHeader>
						<DialogTitle>Visitation Form</DialogTitle>
						<DialogDescription>
							Create visitation for patient
						</DialogDescription>
					</DialogHeader>
					<VisitationForm
						patient={patient}
						setSuccess={setSuccess}
						setIsOpen={setIsOpen}
						setSuccessPatient={setSuccessPatient}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default VisitationButton
