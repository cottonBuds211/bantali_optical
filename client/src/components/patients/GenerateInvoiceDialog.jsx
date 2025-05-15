import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Download } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { ScrollArea } from '../ui/scroll-area'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'

const GenerateInvoiceDialog = ({
	generateInvoice,
	setGenerateInvoice,
	billing,
	lineItems,
	addOns,
	patient,
}) => {
	// const handleDownloadPDF = async () => {
	// 	const blob = await pdf(
	// 		<InvoicePDF
	// 			billingData={billingData}
	// 			patient={patient}
	// 			lineItems={lineItems}
	// 		/>
	// 	).toBlob()
	// 	const url = URL.createObjectURL(blob)
	// 	const link = document.createElement('a')
	// 	link.href = url
	// 	link.download = `Invoice_${patient.first_name}_${patient.last_name}.pdf`
	// 	link.click()
	// 	URL.revokeObjectURL(url) // Clean up the URL object
	// }
	const targetRef = useRef()
	const handleScreenshot = () => {
		const element = targetRef.current
		html2canvas(element, { useCORS: true, scale: 2 }).then(canvas => {
			const image = canvas.toDataURL('image/png')
			const link = document.createElement('a')
			link.href = image
			link.download = `Invoice_${patient?.first_name}_${
				patient?.last_name
			}_${new Date().toLocaleDateString('en-US', {
				month: 'numeric',
				day: 'numeric',
				year: 'numeric',
			})}.png`
			link.click()
			setGenerateInvoice(false)
		})
	}
	const addonPrices = {
		photochromic: 300,
		'anti-reflective': 300,
		'scratch-resistant': 300,
		'uv-protection': 300,
		'blue-light-filtering': 300,
	}
	return (
		<Dialog open={generateInvoice} onOpenChange={setGenerateInvoice}>
			<DialogContent className='w-11/12 sm:max-w-[650px] p-12'>
				<DialogHeader>
					<DialogTitle>Generate Electronic Invoice</DialogTitle>
					<DialogDescription>
						This invoice can be downloaded.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='max-h-[60vh] overflow-y-hidden'>
					<div ref={targetRef} className='p-1'>
						<Card>
							<CardHeader>
								<div className='flex justify-between'>
									<p className='text-lg font-medium'>
										Bantali Optical Clinic
									</p>
								</div>
								<div className='flex justify-between'>
									<p className='text-sm text-muted-foreground'>
										Invoice Number: {billing?.billing_id}
									</p>
								</div>
								<div className='grid grid-cols-2'>
									<div className='flex flex-col'>
										<p className='text-sm text-muted-foreground'>
											Invoice To:
										</p>
										<p>
											{patient?.first_name}{' '}
											{patient?.last_name}
										</p>
									</div>
									<div className='flex flex-col'>
										<p className='text-sm text-muted-foreground'>
											Date Issued:
										</p>
										<p>
											{new Date().toLocaleDateString(
												'en-US',
												{
													month: 'long',
													day: 'numeric',
													year: 'numeric',
												}
											)}
										</p>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className=' flex flex-col justify-between h-[400px]'>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>
													Description
												</TableHead>
												<TableHead>Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{/* MAP THIS */}
											<TableRow>
												<TableCell>
													Service Fee
												</TableCell>
												<TableCell>
													{billing?.service_fee}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Lens Fee</TableCell>
												<TableCell>
													{billing?.lense_fee}
												</TableCell>
											</TableRow>

											{addOns?.map((item, index) => (
												<TableRow key={index}>
													<TableCell>
														<div className='flex flex-row items-center gap-3'>
															{item
																.replace(
																	'-',
																	' '
																)
																.replace(
																	/\b\w/g,
																	c =>
																		c.toUpperCase()
																)}
														</div>
													</TableCell>
													<TableCell>
														{formatNumberWithCommas(
															addonPrices[item]
														)}
													</TableCell>
												</TableRow>
											))}
											{lineItems?.map((item, index) => (
												<TableRow key={index}>
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
															{item.description} x
															{item.quantity}
														</div>
													</TableCell>
													<TableCell>
														{item.unitPrice *
															item.quantity}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									<div className='flex flex-col items-end'>
										<p className='text-sm text-muted-foreground'>
											Subtotal: ₱{' '}
											{formatNumberWithCommas(
												parseFloat(
													billing?.total_amount
												) +
													parseFloat(
														billing?.discount
													)
											)}
										</p>
										<p className='text-sm text-muted-foreground'>
											Discount: ₱{' '}
											{billing?.discount
												? formatNumberWithCommas(
														parseFloat(
															billing?.discount
														)
												  )
												: '0.00'}
										</p>
										<p className='text-sm text-muted-foreground'>
											Initial Payment: ₱{' '}
											{formatNumberWithCommas(
												parseFloat(
													billing?.initialPayment
												)
											)}
										</p>
										<p className='text-lg font-semibold'>
											Amount Due: ₱{' '}
											{formatNumberWithCommas(
												parseFloat(
													billing?.total_amount
												) -
													parseFloat(
														billing?.initialPayment
													) -
													parseFloat(
														billing?.discount
													)
											) < 0
												? (0).toFixed(2)
												: formatNumberWithCommas(
														parseFloat(
															billing?.total_amount
														) -
															parseFloat(
																billing?.initialPayment
															) -
															parseFloat(
																billing?.discount
															)
												  )}
										</p>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<p>Bantali Optical Clinic</p>
							</CardFooter>
						</Card>
					</div>
				</ScrollArea>
				<DialogFooter className='sm:justify-between'>
					<Button
						type='button'
						variant='secondary'
						onClick={() => setGenerateInvoice(false)}
					>
						Close
					</Button>
					<Button type='button' onClick={handleScreenshot}>
						<Download className='mr-2 h-4 w-4' />
						Download Screenshot
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default GenerateInvoiceDialog
