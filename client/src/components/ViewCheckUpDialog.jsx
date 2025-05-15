import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from './ui/dialog'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Calendar, User, Clock } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { PatientContext } from './PatientProfile'
import { useContext } from 'react'

const ViewCheckUpDialog = ({ visit, checkUp, setCheckUp }) => {
	const { patient } = useContext(PatientContext)
	return (
		<div>
			<Dialog
				open={checkUp !== null}
				onOpenChange={isOpen => !isOpen && setCheckUp(null)}
			>
				{checkUp && (
					<DialogContent
						onInteractOutside={e => {
							e.preventDefault()
						}}
						className='w-11/12 sm:max-w-xl p-12'
					>
						<DialogHeader>
							<DialogTitle>Detailed Checkup Findings</DialogTitle>
							<DialogDescription>
								Comprehensive information about the optical
								checkup
							</DialogDescription>
						</DialogHeader>
						{/* checkUp.check_up.checkUpData
													.visac_far */}
						{checkUp && (
							<ScrollArea className='h-[500px]'>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-[20px_1fr] items-start gap-4 text-sm'>
										<User className='w-5 h-5' />
										<div>
											{patient.first_name}{' '}
											{patient.last_name}
										</div>
										<Calendar className='w-5 h-5' />
										<div>{visit.visitation_date}</div>
										<Clock className='w-5 h-5' />
										<div>{visit.visitation_time}</div>
									</div>
									<Separator />
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
																checkUp.check_up
																	.checkUpData
																	.visualAcuityNearLeft
															}
														</p>
														<p className='text-muted-foreground pl-2'>
															Right:{' '}
															{
																checkUp.check_up
																	.checkUpData
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
																checkUp.check_up
																	.checkUpData
																	.visualAcuityDistanceLeft
															}
														</p>
														<p className='text-muted-foreground pl-2'>
															Right:{' '}
															{
																checkUp.check_up
																	.checkUpData
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
										<div className='grid grid-cols-4 gap-4 text-center font-semibold mb-2 text-sm'>
											<div className='col-span-1'></div>
											<div>SPH</div>
											<div>CYL</div>
											<div>AXIS</div>
										</div>
										<div className='grid grid-cols-4 gap-4 mb-4  items-center text-sm'>
											<div className='font-semibold text-right'>
												OD (Right)
											</div>
											<div className='flex justify-center'>
												{
													checkUp.check_up.checkUpData
														.refractionSphereRight
												}
											</div>
											<div className='flex justify-center'>
												{
													checkUp.check_up.checkUpData
														.refractionCylinderLeft
												}
											</div>
											<div className='flex justify-center'>
												{
													checkUp.check_up.checkUpData
														.refractionAxisRight
												}
											</div>
										</div>

										<div className='grid grid-cols-4 gap-4 items-center text-sm'>
											<div className='font-semibold text-right'>
												OS (Left)
											</div>
											<div className='flex justify-center'>
												{
													checkUp.check_up.checkUpData
														.refractionSphereLeft
												}
											</div>
											<div className='flex justify-center'>
												{
													checkUp.check_up.checkUpData
														.refractionCylinderRight
												}
											</div>
											<div className='flex justify-center'>
												{
													checkUp.check_up.checkUpData
														.refractionAxisLeft
												}
											</div>
										</div>
									</div>

									<Separator />
									<div>
										<h4 className='text-sm font-semibold '>
											Color Blindness
										</h4>
										<div className='ml-5 space-y-2 text-sm'>
											<p>
												Status:{' '}
												{
													checkUp.check_up.checkUpData
														.colorBlind
												}
											</p>
											{checkUp.check_up.checkUpData
												.colorBlind !== 'no' ? (
												<>
													<p>
														Type:{' '}
														{
															checkUp.check_up
																.checkUpData
																.colorBlindType
														}
													</p>
													<p>
														Severity:{' '}
														{
															checkUp.check_up
																.checkUpData
																.colorBlindSeverity
														}
													</p>
												</>
											) : null}
										</div>
									</div>
									<div>
										<h4 className='text-sm font-semibold mb-2'>
											Eye Movement and Coordination
										</h4>
										<p className='ml-5  text-sm'>
											{
												checkUp.check_up.checkUpData
													.eyeMovementCoordination
											}
										</p>
									</div>
									<Separator />

									<div>
										<h4 className='text-sm font-semibold mb-2'>
											Doctor's Notes
										</h4>
										<p className='ml-5  text-sm'>
											{
												checkUp.check_up.checkUpData
													.docNotes
											}
										</p>
									</div>
								</div>
							</ScrollArea>
						)}
						<DialogFooter>
							<Button onClick={() => setCheckUp(null)}>
								Close
							</Button>
						</DialogFooter>
					</DialogContent>
				)}
			</Dialog>
		</div>
	)
}

export default ViewCheckUpDialog
