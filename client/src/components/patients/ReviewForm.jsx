import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Calendar, Clock } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'
const ReviewForm = ({
	visitData,
	billing,
	lineItems,
	setGenerateInvoice,
	addOns,
}) => {
	const addonPrices = {
		photochromic: 300,
		'anti-reflective': 300,
		'scratch-resistant': 300,
		'uv-protection': 300,
		'blue-light-filtering': 300,
	}
	return (
		<div>
			{visitData && (
				<>
					<div className='flex flex-col gap-2'>
						<Card className='p-5'>
							<CardHeader>
								<h3 className='font-semibold text-lg'>
									Visitation Details:
								</h3>
							</CardHeader>
							<CardContent>
								<div className='flex flex-row gap-2 text-sm text-muted-foreground ml-3'>
									<Calendar className='w-5 h-5' />
									{visitData.visitation_date}
								</div>
								<div className='flex flex-row gap-2 text-muted-foreground text-sm ml-3'>
									<Clock className='w-5 h-5' />
									{visitData.visitation_time}
								</div>

								<div className='grid gap-4 py-4 ml-3'>
									<div className='space-y-2'>
										<h4 className='text-sm font-semibold mb-2'>
											Visual Acuity
										</h4>
										<div className='grid grid-cols-2 gap-2 ml-5 space-y-2 text-sm'>
											<div className='space-y-2'>
												Near:{' '}
												<div className='grid grid-row-2 '>
													<div className='text-sm'>
														<p className='text-muted-foreground pl-2'>
															Left:{' '}
															{
																visitData
																	.visit_data
																	.visualAcuityNearLeft
															}
														</p>
														<p className='text-muted-foreground pl-2'>
															Right:{' '}
															{
																visitData
																	.visit_data
																	.visualAcuityNearRight
															}
														</p>
													</div>
												</div>
											</div>
											<div className='space-y-2'>
												Distance:{' '}
												<div className='grid grid-row-2 '>
													<div className='text-sm'>
														<p className='text-muted-foreground  pl-2'>
															Left:{' '}
															{
																visitData
																	.visit_data
																	.visualAcuityDistanceLeft
															}
														</p>
														<p className='text-muted-foreground pl-2'>
															Right:{' '}
															{
																visitData
																	.visit_data
																	.visualAcuityDistanceRight
															}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='space-y-2'>
										<h4 className='text-sm font-semibold mb-2'>
											Refraction
										</h4>
										<div className='grid grid-cols-5 gap-4 text-center font-semibold mb-2 text-sm'>
											<div className='col-span-1'></div>
											<div>SPH</div>
											<div>CYL</div>
											<div>AXIS</div>
											<div>ADD</div>
										</div>
										<div className='grid grid-cols-5 gap-4 mb-4  items-center text-sm'>
											<div className='font-semibold text-right'>
												OD (Right)
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.odSphere}
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.odCyl}
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.odAxis}
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.odAdd}
											</div>
										</div>

										<div className='grid grid-cols-5 gap-4 items-center text-sm'>
											<div className='font-semibold text-right'>
												OS (Left)
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.osSphere}
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.osCyl}
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.osAxis}
											</div>
											<div className='flex text-muted-foreground justify-center'>
												{visitData.visit_data.osAdd}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<div>
									<h4 className='text-sm font-semibold mb-2'>
										Doctor's Notes
									</h4>
									<p className='ml-5  text-sm'>
										{visitData.visit_data.docNotes}
									</p>
								</div>
							</CardFooter>
						</Card>
						<Card className='p-5'>
							<CardHeader>
								<h3 className='font-semibold mt-4 mb-4 text-lg'>
									Billing Details:
								</h3>
							</CardHeader>
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
									{lineItems?.map((item, index) => (
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
									{addOns?.map((item, index) => (
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
									<div className='flex justify-end'>
										<div className='grid grid-cols-2'>
											<div className='col-span-1 '>
												<div className='flex flex-col text-sm gap-3'>
													<span>
														Sub Total Amount:
													</span>
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
									<div className='flex w-full  justify-between'>
										<div className='flex items-center text-lg '>
											<span>Amount Due:</span>
										</div>
										<div className='flex items-center'>
											<div className='font-medium text-lg mr-4'>
												₱{' '}
												{billing.total_amount -
													billing.initialPayment -
													billing?.discount <
												0
													? (0).toFixed(2)
													: formatNumberWithCommas(
															billing.total_amount -
																billing.initialPayment -
																billing?.discount
													  )}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className='w-full bg-primary-foreground text-primary hover:bg-secondary'
									onClick={() => setGenerateInvoice(true)}
								>
									To PDF
								</Button>
							</CardFooter>
						</Card>
					</div>
				</>
			)}
		</div>
	)
}

export default ReviewForm
