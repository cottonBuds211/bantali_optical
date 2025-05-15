import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Glasses,
	Shield,
	Sun,
	Monitor,
	Camera,
	Droplet,
	Feather,
} from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
	FormControl,
	FormDescription,
} from '../ui/form'
import { Separator } from '../ui/separator'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'

const BillingForm = ({
	setBilling,
	billingForm,
	lineItems,
	addOns,
	setAddOns,
}) => {
	const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`

	const lineItemsTotal = lineItems.reduce(
		(sum, item) => sum + item.quantity * item.unitPrice,
		0
	)

	const serviceFee = parseFloat(billingForm.watch('serviceFee'))
	const lensCost = parseFloat(billingForm.watch('lensCost')) || 0
	const discount = parseFloat(billingForm.watch('discount')) || 0
	const initialPayment = parseFloat(billingForm.watch('initialPayment')) || 0

	const addonPrices = {
		photochromic: 300,
		'anti-reflective': 300,
		'scratch-resistant': 300,
		'uv-protection': 300,
		'blue-light-filtering': 300,
	}
	const calculateSubtotal = () => {
		const addOnsTotal = addOns.reduce(
			(sum, addon) => sum + addonPrices[addon],
			0
		)
		if (!serviceFee || !lensCost) {
			return lineItemsTotal + addOnsTotal
		}
		return lineItemsTotal + serviceFee + lensCost + addOnsTotal
	}
	const calculateTotal = () => {
		const subtotal = calculateSubtotal()
		const discountedSubtotal = subtotal - discount - initialPayment

		return discountedSubtotal
	}

	useEffect(() => {
		const billingData = {
			billing_id: invoiceId,
			total_amount: calculateSubtotal(),
			lineItems: lineItems,
			service_fee: serviceFee,
			lense_fee: lensCost,
			discount: discount,
			addOns: addOns,
			initialPayment: initialPayment,
			initialPaymentDate: new Date(),
			status: calculateTotal() > 0 ? 'Partial' : 'Paid',
		}
		console.log(billingData)
		setBilling(billingData)
	}, [serviceFee, lensCost, discount, initialPayment, addOns])

	const handleAddOnChange = (addon, isChecked) => {
		setAddOns(prev =>
			isChecked ? [...prev, addon] : prev.filter(a => a !== addon)
		)
	}
	return (
		<div className='mx-5'>
			<CardContent>
				<Form {...billingForm}>
					<form>
						<div className='flex flex-col gap-5'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={billingForm.control}
									name='serviceFee'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Service Fee</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter service fee'
													{...field}
													type='text'
													inputMode='numeric'
													step={0.01}
													onChange={e => {
														const value =
															e.target.value.replace(
																/\D/g,
																''
															)
														field.onChange(value)
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={billingForm.control}
									name='lensCost'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Lens Cost</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter lens cost'
													{...field}
													type='text'
													inputMode='numeric'
													step={0.01}
													onChange={e => {
														const value =
															e.target.value.replace(
																/\D/g,
																''
															)
														field.onChange(value)
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

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
										{lineItems?.map(item => (
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
													{item.quantity}
												</TableCell>

												<TableCell>
													₱{item.unitPrice}
												</TableCell>
												<TableCell>
													₱
													{item.unitPrice *
														item.quantity}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
							<div className='lg:w-full flex flex-col gap-2'>
								<Label>Lens Add-ons</Label>
								<div className='grid grid-cols-2 gap-3'>
									{Object.keys(addonPrices).map(addon => (
										<FormField
											control={billingForm.control}
											name={addon}
											key={addon}
											render={({ field }) => (
												<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
													<FormControl>
														<Checkbox
															checked={
																field.value
															}
															onCheckedChange={isChecked => {
																field.onChange(
																	isChecked
																)
																handleAddOnChange(
																	addon,
																	isChecked
																)
															}}
														/>
													</FormControl>

													<div className='w-full flex flex-col gap-2'>
														<div className='space-y-1 leading-none'>
															<FormLabel>
																{addon
																	.replace(
																		'-',
																		' '
																	)
																	.replace(
																		/\b\w/g,
																		c =>
																			c.toUpperCase()
																	)}
															</FormLabel>
															<FormDescription>
																{/* Add relevant description here */}
															</FormDescription>
														</div>
														<Separator />
														<div className='flex justify-end text-sm'>
															₱
															{addonPrices[addon]}
														</div>
													</div>
												</FormItem>
											)}
										/>
									))}
								</div>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={billingForm.control}
									name='discount'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Discount</FormLabel>
											<FormControl>
												<Input
													step={0.01}
													placeholder='Enter discount'
													{...field}
													type='text'
													inputMode='numeric'
													onChange={e => {
														const value =
															e.target.value.replace(
																/\D/g,
																''
															)
														field.onChange(value)
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={billingForm.control}
									name='initialPayment'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Initial Payment
											</FormLabel>
											<FormControl>
												<Input
													step={0.01}
													placeholder='Enter initial payment'
													{...field}
													type='text'
													inputMode='numeric'
													onChange={e => {
														const value =
															e.target.value.replace(
																/\D/g,
																''
															)
														field.onChange(value)
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='flex flex-col md:flex-row justify-end items-start md:items-center space-y-4 md:space-y-0'>
								<div className='text-right w-full md:w-auto'>
									<p className='text-sm text-gray-500'>
										Subtotal: ₱
										{calculateSubtotal()
											? formatNumberWithCommas(
													calculateSubtotal()
											  )
											: '0.00'}
									</p>
									<p className='text-sm text-gray-500'>
										Discount: ₱
										{discount
											? formatNumberWithCommas(discount)
											: '0.00'}
									</p>
									<p className='text-sm text-gray-500'>
										Initial Payment: ₱
										{initialPayment
											? formatNumberWithCommas(
													initialPayment
											  )
											: '0.00'}
									</p>

									<p className='text-lg font-bold'>
										Amount Due: ₱
										{calculateTotal() > 0
											? formatNumberWithCommas(
													calculateTotal()
											  )
											: '0.00'}
									</p>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</div>
	)
}

export default BillingForm
