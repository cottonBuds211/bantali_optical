import { useEffect, useState } from 'react'

import { PlusCircle, Search } from 'lucide-react'
import { Input } from '../ui/input'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'
import InventoryServices from '@/services/inventoryServices'
import { ScrollArea } from '../ui/scroll-area'
import { Badge } from '../ui/badge'

const AddFrames = ({ isDialogOpen, setIsDialogOpen, addLineItem }) => {
	const inventoryServices = new InventoryServices()
	const [inventory, setInvetory] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const filteredItems = inventory.filter(item =>
		item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getInventory = async () => {
			try {
				const inventory = await inventoryServices.getAllInventory(
					signal
				)
				isMounted && setInvetory(inventory)
			} catch (err) {
				console.error(err)
			}
		}
		getInventory()
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button type='button' variant='outline' className='mt-2'>
					<PlusCircle className='mr-2 h-4 w-4' />
					Add Item
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Add Item</DialogTitle>
					<DialogDescription>
						Select an item from the inventory to add to the invoice.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='flex items-center space-x-2'>
						<Search className='w-4 h-4 opacity-50' />
						<Input
							placeholder='Search items...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<ScrollArea className='h-[400px] overflow-y-auto'>
						{filteredItems.map(item =>
							item.stockQuantity !== 0 ? (
								<div
									key={item.id}
									className='w-full h-fit justify-start text-left hover:bg-gray-300 p-2 rounded-sm cursor-pointer'
									onClick={() => addLineItem(item)}
								>
									<div className='h-full'>
										<div className='text-md font-semibold flex flex-row'>
											{item.item_name}
										</div>
										<div className='grid grid-cols-2 ml-2 text-sm font-normal text-muted-foreground'>
											<div className='flex flex-row gap-2'>
												<img
													className='h-16 w-20 rounded-md object-contain'
													src={
														item.imageUrl
															? `http://localhost:3002${item.imageUrl}`
															: '/src/assets/glasses.png'
													}
													alt='Frame Image'
												/>
												<div className='flex flex-col'>
													<span>
														Color: {item.color}
													</span>
													<span>
														Available Stock:{' '}
														{item.stockQuantity}
													</span>
													<span>
														Material:{' '}
														{item.material}
													</span>
												</div>
											</div>
											<div className='flex flex-col'>
												<Badge className='w-fit bg-green-500'>
													Available
												</Badge>
												<span>
													Price: ₱{item.price}
												</span>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div
									key={item.id}
									className='w-full h-fit justify-start text-left hover:bg-gray-300 p-2 rounded-sm cursor-pointer'
								>
									<div className='h-full'>
										<div className='text-md font-semibold'>
											{item.item_name}
										</div>
										<div className='grid grid-cols-2 ml-2 text-sm font-normal text-muted-foreground'>
											<div className='flex flex-col'>
												<span>Color: {item.color}</span>
												<span>
													Available Stock:{' '}
													{item.stockQuantity}
												</span>
												<span>
													Material: {item.material}
												</span>
											</div>
											<div className='flex flex-col'>
												<Badge className='w-fit bg-red-500'>
													Out of Stock
												</Badge>
												<span>
													Price: ₱{item.price}
												</span>
											</div>
										</div>
									</div>
								</div>
							)
						)}
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default AddFrames
