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

const ViewFollowUpDialog = ({ followUp, setFollowUp, visit }) => {
	return (
		<Dialog
			open={followUp !== null}
			onOpenChange={isOpen => !isOpen && setFollowUp(null)}
		>
			<DialogContent
				onInteractOutside={e => {
					e.preventDefault()
				}}
				className='w-11/12 sm:max-w-xl p-12'
			>
				<DialogHeader>
					<DialogTitle>Detailed Follow up </DialogTitle>
					<DialogDescription>
						Comprehensive information about the optical follow up
					</DialogDescription>
				</DialogHeader>
				{/* checkUp.check_up.checkUpData
                                            .visac_far */}
				{followUp && (
					<ScrollArea>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-[20px_1fr] items-start gap-4 text-sm'>
								<User className='w-5 h-5' />
								<div>Patient Name Here</div>
								<Calendar className='w-5 h-5' />
								<div>{visit.visitation_date}</div>
								<Clock className='w-5 h-5' />
								<div>{visit.visitation_time}</div>
							</div>
							<Separator />
							<div>
								<h4 className='text-sm font-semibold mb-2'>
									Reason For Follow Up
								</h4>
								<p>{followUp.reason_for_follow_up}</p>
							</div>
							<Separator />

							<div>
								<h4 className='text-sm font-semibold mb-2'>
									Doctor's Notes
								</h4>
								<p>{followUp.doctor_notes}</p>
							</div>
						</div>
					</ScrollArea>
				)}
				<DialogFooter>
					<Button onClick={() => setFollowUp(null)}>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ViewFollowUpDialog
