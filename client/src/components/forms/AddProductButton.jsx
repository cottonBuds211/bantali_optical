import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import AddProductForm from './AddProductForm'
import { Button } from '../ui/button'
import { useState } from 'react'
const AddProductButton = ({ setRefresh }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className='mr-2 h-4 w-4' /> Add New Product
				</Button>
			</DialogTrigger>
			<DialogContent
				className='w-11/12 sm:max-w-xl p-12'
				onInteractOutside={e => {
					e.preventDefault()
				}}
			>
				<DialogHeader>
					<DialogTitle>Add New Product</DialogTitle>
					<DialogDescription>
						Enter the details of the new product below. Click save
						when you're done.
					</DialogDescription>
				</DialogHeader>
				<AddProductForm
					setRefresh={setRefresh}
					setIsDialogOpen={setIsDialogOpen}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default AddProductButton
