import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Edit } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import EditProductForm from '../forms/EditProductForm'
import { ScrollArea } from '../ui/scroll-area'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'
const InventoryRow = ({ item, setRefresh }) => {
	const [edit, setEdit] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const placeholderImage = 'src/assets/glasses.png'
	return (
		<TableRow key={item.item_id}>
			{/* <TableCell className='font-medium'>{frame.frame_id}</TableCell> */}
			<TableCell>
				<div className='flex flex-row gap-4 items-center'>
					{/* Image with loader and fallback */}
					<img
						className='h-16 w-20 rounded-md bg-white object-contain'
						src={
							item.imageUrl
								? `http://localhost:3002${item.imageUrl}`
								: placeholderImage
						}
						alt='Item Image'
						onLoad={() => setIsLoading(false)}
						onError={e => {
							e.target.onerror = null // Prevents looping in case placeholder fails
							e.target.src = placeholderImage // Set fallback image on error
							setIsLoading(false)
						}}
						style={{ display: isLoading ? 'none' : 'block' }}
					/>

					{/* Loader */}
					{isLoading && (
						<l-ring
							size='40'
							stroke='5'
							bg-opacity='0'
							speed='2'
							color='gray'
						></l-ring>
					)}

					{/* Frame Name */}
					{item.item_name}
				</div>
			</TableCell>
			<TableCell>{item.color}</TableCell>
			<TableCell>{item.material}</TableCell>
			<TableCell>
				{item.stockQuantity != 0 ? (
					item.stockQuantity
				) : (
					<span className='text-red-500'>Out of Stock</span>
				)}
			</TableCell>
			<TableCell>₱ {formatNumberWithCommas(item.price)}</TableCell>
			<TableCell className='text-right'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onSelect={() => setEdit(!edit)}
							className='flex items-center'
						>
							<Edit className='mr-2 h-4 w-4' />
							Edit
						</DropdownMenuItem>
					</DropdownMenuContent>
					<Dialog open={edit} onOpenChange={setEdit} modal>
						<DialogTrigger></DialogTrigger>
						<DialogContent
							className='w-11/12 sm:max-w-xl p-12'
							onInteractOutside={e => {
								e.preventDefault()
							}}
						>
							<DialogHeader>
								<DialogTitle>Edit Product</DialogTitle>
								<DialogDescription>
									Enter the details of the new product below.
									Click save when you're done.
								</DialogDescription>
							</DialogHeader>
							<ScrollArea className='p-2 max-h-[60vh] overflow-y-hidden'>
								<EditProductForm
									item={item}
									setEdit={setEdit}
									setRefresh={setRefresh}
								/>
							</ScrollArea>
						</DialogContent>
					</Dialog>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}

export default InventoryRow
