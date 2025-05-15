import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Calendar, User, Clock } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'

import { usePatient } from '@/context/PatientContext'

const ViewCheckUpDialog = ({ visit, dialogOpen, setDialogOpen }) => {
	const { patient } = usePatient()
	return (
		<div>
			<Dialog
				open={dialogOpen}
				onOpenChange={isOpen => !isOpen && setDialogOpen(!dialogOpen)}
			>
				<DialogContent className='w-11/12 sm:max-w-xl p-12'>
					<DialogHeader>
						<DialogTitle>Detailed Checkup Findings</DialogTitle>
						<DialogDescription>
							Comprehensive information about the optical checkup
						</DialogDescription>
					</DialogHeader>
					{/* checkUp.check_up.checkUpData
													.visac_far */}
					<ScrollArea>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-[20px_1fr] items-start gap-4 text-sm'>
								<User className='w-5 h-5' />
								<div>
									{patient.first_name} {patient.last_name}
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
														visit.visit_data
															.visualAcuityNearLeft
													}
												</p>
												<p className='text-muted-foreground pl-2'>
													Right:{' '}
													{
														visit.visit_data
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
														visit.visit_data
															.visualAcuityDistanceLeft
													}
												</p>
												<p className='text-muted-foreground pl-2'>
													Right:{' '}
													{
														visit.visit_data
															.visualAcuityDistanceRight
													}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<Separator />
							<div>
								<h4 className='text-sm font-semibold mb-2'>
									Doctor's Notes
								</h4>
								<p className='ml-5  text-sm'>
									{visit.visit_data.docNotes}
								</p>
							</div>
						</div>
					</ScrollArea>

					<DialogFooter>
						<Button onClick={() => setDialogOpen(false)}>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ViewCheckUpDialog
