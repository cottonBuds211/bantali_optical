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
import AddUserForm from './AddUserForm'
const AddUserButton = ({ setRefresh }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className='mr-2 h-4 w-4' />
					Add new User
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 sm:max-w-xl p-12'>
				<DialogHeader>
					<DialogTitle>Add New User</DialogTitle>
					<DialogDescription>
						Enter the details of the new user below. Click save when
						you're done.
					</DialogDescription>
				</DialogHeader>
				<AddUserForm
					setRefresh={setRefresh}
					setIsDialogOpen={setIsDialogOpen}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default AddUserButton
