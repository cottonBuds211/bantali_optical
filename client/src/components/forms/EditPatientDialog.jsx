import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import EditPatientForm from './EditPatientForm'
import { ScrollArea } from '../ui/scroll-area'

const EditPatientDialog = ({ open, setOpen }) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				onInteractOutside={e => {
					e.preventDefault()
				}}
				className='w-11/12 sm:max-w-xl p-12'
			>
				{/* Content within DialogContent */}
				<DialogHeader>
					<DialogTitle>Edit Patient</DialogTitle>
					<DialogDescription>Edit Patient info</DialogDescription>
				</DialogHeader>
				<ScrollArea className='max-h-[60vh] overflow-y-hidden'>
					<EditPatientForm setOpen={setOpen} />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default EditPatientDialog
