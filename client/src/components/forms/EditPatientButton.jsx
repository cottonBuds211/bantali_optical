import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import EditPatientForm from './EditPatientForm'

const EditPatientButton = () => {
	const [open, setOpen] = useState(false)
	useEffect(() => {
		if (setOpen) {
			setOpen(false)
		}
	}, [setOpen])
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className='w-full border-dotted

'
					variant='outline'
				>
					Edit
				</Button>
			</DialogTrigger>
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
				<EditPatientForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}

export default EditPatientButton
