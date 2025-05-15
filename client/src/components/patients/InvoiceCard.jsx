import { CalendarIcon, CreditCard, ChevronDown, ChevronUp } from 'lucide-react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	Card,
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '../ui/button'

import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Separator } from '../ui/separator'
import BillingServices from '@/services/billingServices'
import useAuth from '@/hooks/useAuth'
import { useToast } from '../ui/use-toast'
import { usePatient } from '@/context/PatientContext'
import GenerateInvoiceDialog from './GenerateInvoiceDialog'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'

const getStatusColor = status => {
	switch (status) {
		case 'Paid':
			return 'bg-green-500/90'

		case 'Partial':
			return 'bg-red-500/90'
		default:
			return 'bg-gray-500'
	}
}
const InvoiceCard = ({ billing, setRefresh }) => {
	const [generateInvoice, setGenerateInvoice] = useState(false)
	const { patient } = usePatient()
	const { auth } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const billingServices = new BillingServices()
	const { toast } = useToast()
	const handleMarkAsPaid = async () => {
		try {
			const response = await billingServices.markBillingAsPaid(
				billing.billing_id,
				auth.user.user_id
			)
			toast({
				title: 'Success',
				description: `Billing ${billing.billing_id} marked as paid.`,
				duration: 3000,
			})
			setRefresh(true)
		} catch (error) {
			console.log(error)
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: error.response?.data.error,
				duration: 3000,
			})
		}
	}
	const addonPrices = {
		photochromic: 300,
		'anti-reflective': 300,
		'scratch-resistant': 300,
		'uv-protection': 300,
		'blue-light-filtering': 300,
	}
	return (
		<>
			<Card className='w-full p-5 mx-auto hover:shadow-lg transition-shadow duration-300'>
				<Collapsible
					open={isOpen}
					onOpenChange={setIsOpen}
					className='transition-all duration-300'
				>
					<CardContent className='p-4 flex flex-row justify-between items-center'>
						<div>
							<div className='flex justify-between items-start'>
								<div className='col-span-2 flex flex-row gap-4'>
									<p className='text-md font-medium'>
										Invoice number: {billing.billing_id}
									</p>
									<Badge
										className={`${getStatusColor(
											billing.status
										)}`}
									>
										{billing.status}
									</Badge>
								</div>
							</div>
							<div className='mt-4 flex flex-col gap-1'>
								<div className='flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1'>
									<CalendarIcon className='mr-1 h-4 w-4' />
									<span className='w-full'>
										Initial Payment Date:{' '}
										{new Date(
											billing.initialPaymentDate
										).toLocaleDateString('en-US', {
											month: 'long',
											year: 'numeric',
											day: 'numeric',
										})}
									</span>
								</div>
								<div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
									<span className='w-full'>
										{billing.finalPaymentDate ? (
											<div className='flex flex-row gap-1'>
												<CalendarIcon className='mr-1 h-4 w-4' />
												<span>
													Final Payment Date:{' '}
													{new Date(
														billing.finalPaymentDate
													).toLocaleDateString(
														'en-US',
														{
															month: 'long',
															day: 'numeric',
															year: 'numeric',
														}
													)}
												</span>
											</div>
										) : null}
									</span>
								</div>
							</div>
						</div>
						<div>
							{billing.status !== 'Paid' ? (
								<Button onClick={handleMarkAsPaid}>
									Mark as Paid
								</Button>
							) : null}
						</div>
					</CardContent>

					<CollapsibleContent>
						<CardContent>
							<div className='flex flex-col text-muted-foreground ml-10 gap-3'>
								<div className='flex justify-between text-muted-foreground'>
									<div className='flex items-center text-sm text-muted-foreground'>
										<span>Service Fee:</span>
									</div>
									<div className='flex items-center'>
										<div className='font-medium text-sm  mr-4'>
											{formatNumberWithCommas(
												billing?.service_fee
											)}
										</div>
									</div>
								</div>
								<Separator />
								<div className='flex justify-between'>
									<div className='flex items-center text-sm '>
										<span>Lense Cost:</span>
									</div>
									<div className='flex items-center'>
										<div className='font-medium text-sm  mr-4'>
											{formatNumberWithCommas(
												billing?.lense_fee
											)}
										</div>
									</div>
								</div>
								<Separator />
								{billing.addOns?.map((item, index) => (
									<div
										className='flex justify-between'
										key={index}
									>
										<div className='flex items-center text-sm '>
											<span>
												{item
													.replace('-', ' ')
													.replace(/\b\w/g, c =>
														c.toUpperCase()
													)}
											</span>
										</div>
										<div className='flex items-center'>
											<div className='font-medium text-sm  mr-4'>
												{formatNumberWithCommas(
													addonPrices[item]
												)}
											</div>
										</div>
									</div>
								))}
								<Separator />
								{billing.lineItems?.map((item, index) => (
									<div
										className='flex justify-between'
										key={index}
									>
										<div className='flex items-center text-sm '>
											<span>
												{item.description} x
												{item.quantity}
											</span>
										</div>
										<div className='flex items-center'>
											<div className='font-medium text-sm  mr-4'>
												{formatNumberWithCommas(
													item.unitPrice *
														item.quantity
												)}
											</div>
										</div>
									</div>
								))}
								<Separator />

								<div className='flex justify-end'>
									<div className='grid grid-cols-2'>
										<div className='col-span-1 '>
											<div className='flex flex-col text-sm gap-3'>
												<span>Sub Total Amount:</span>
												<span>Initial Payment</span>
												<span>Discount</span>
											</div>
										</div>
										<div className='col-span-1'>
											<div className='flex flex-col items-end mr-4 text-sm gap-3 font-medium'>
												<span>
													{formatNumberWithCommas(
														billing.total_amount
													)}
												</span>
												<span>
													-
													{formatNumberWithCommas(
														billing.initialPayment
													)}
												</span>
												<span>
													{billing.discount
														? '-' +
														  formatNumberWithCommas(
																billing.discount
														  )
														: '0.00'}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='flex mt-5 justify-end gap-5'>
								<Button
									className='bg-slate-400 hover:bg-slate-500'
									onClick={() => setGenerateInvoice(true)}
								>
									To PDF
								</Button>
							</div>
						</CardContent>
					</CollapsibleContent>
					<CardFooter
						className={`${getStatusColor(
							billing.status
						)} text-white p-4 flex justify-between items-center rounded-lg`}
					>
						<div className='flex items-center text-sm text-white '>
							<CreditCard className='mr-1 h-4 w-4' />
							<span>Amount Due:</span>
						</div>
						<div className='flex items-center'>
							<div className='font-medium mr-4'>
								{billing.status === 'Paid' ? (
									'Fully Paid'
								) : (
									<span>
										₱{' '}
										{formatNumberWithCommas(
											billing.total_amount -
												billing.initialPayment -
												billing?.discount
										)}
									</span>
								)}
							</div>
							<CollapsibleTrigger asChild>
								<Button
									variant='ghost'
									className='hover:bg-transparent'
									size='sm'
								>
									{isOpen ? (
										<ChevronUp className='h-4 w-4' />
									) : (
										<ChevronDown className='h-4 w-4' />
									)}
								</Button>
							</CollapsibleTrigger>
						</div>
					</CardFooter>
				</Collapsible>
			</Card>
			<GenerateInvoiceDialog
				setGenerateInvoice={setGenerateInvoice}
				generateInvoice={generateInvoice}
				billing={billing}
				addOns={billing.addOns}
				lineItems={billing.lineItems}
				patient={patient}
			/>
		</>
	)
}

export default InvoiceCard
