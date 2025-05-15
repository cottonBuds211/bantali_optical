import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Label } from '../ui/label'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import AddFrames from '../patients/AddFrames'
import { useState, useCallback } from 'react'
import { Input } from '../ui/input'
const SalesForm = ({ lineItems, setLineItems }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const removeLineItem = useCallback(
		id => {
			setLineItems(lineItems.filter(item => item.id !== id))
		},
		[lineItems]
	)

	const updateLineItem = useCallback(
		(id, field, value) => {
			setLineItems(
				lineItems.map(item =>
					item.id === id ? { ...item, [field]: value } : item
				)
			)
		},
		[lineItems]
	)

	const addLineItem = useCallback(
		item => {
			const newId =
				lineItems.length > 0
					? Math.max(...lineItems.map(item => item.id)) + 1
					: 1
			setLineItems([
				...lineItems,
				{
					id: newId,
					imageUrl: item.imageUrl,
					description: item.item_name,
					quantity: 1,
					stockQuantity: item.stockQuantity,
					unitPrice: item.price,
					item_id: item.item_id,
				},
			])
			setIsDialogOpen(false)
		},
		[lineItems]
	)
	return (
		<div className='space-y-2'>
			<Label>Frames</Label>
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[40%]'>
								Description
							</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Unit Price</TableHead>
							<TableHead>Total</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lineItems.map(item => (
							<TableRow key={item.id}>
								<TableCell>
									<div className='flex flex-row items-center gap-3'>
										<img
											className='h-16 w-20 rounded-md object-contain'
											src={
												item.imageUrl
													? `http://localhost:3002${item.imageUrl}`
													: '/src/assets/glasses.png'
											}
											alt='Frame Image'
										/>
										{item.description}
									</div>
								</TableCell>
								<TableCell>
									<Input
										type='number'
										value={item.quantity}
										onChange={e => {
											const value = parseInt(
												e.target.value,
												10
											)

											// Enforce minimum and maximum bounds
											if (
												value >= 1 &&
												value <= item.stockQuantity
											) {
												updateLineItem(
													item.id,
													'quantity',
													value
												)
											} else if (
												value > item.stockQuantity
											) {
												updateLineItem(
													item.id,
													'quantity',
													item.stockQuantity
												) // Set to max if greater than stock
											} else if (value < 1) {
												updateLineItem(
													item.id,
													'quantity',
													1
												) // Set to min if less than 1
											}
										}}
										min={1}
										max={item.stockQuantity}
										className='w-full'
									/>
								</TableCell>
								<TableCell>₱{item.unitPrice}</TableCell>

								<TableCell>
									₱
									{(item.quantity * item.unitPrice).toFixed(
										2
									)}
								</TableCell>
								<TableCell>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										onClick={() => removeLineItem(item.id)}
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<AddFrames
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				addLineItem={addLineItem}
			/>
		</div>
	)
}

export default SalesForm
