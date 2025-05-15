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
import { Calendar, User } from 'lucide-react'

import { usePatient } from '@/context/PatientContext'
const ViewPrescriptionDialog = ({ visit, dialogOpen, handleView }) => {
	const { patient } = usePatient()
	return (
		<div>
			<Dialog open={dialogOpen} onOpenChange={handleView}>
				<DialogContent className='w-11/12 sm:max-w-xl p-12'>
					<DialogHeader>
						<DialogTitle>Prescription Summary</DialogTitle>
						<DialogDescription>
							Review your prescription lens order details below.
						</DialogDescription>
					</DialogHeader>
					{visit && (
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-[20px_1fr] items-start gap-4 text-sm'>
								<User className='w-5 h-5' />
								<div>
									{patient.first_name} {patient.last_name}
								</div>
								<Calendar className='w-5 h-5' />
								<div>{visit.visitation_date}</div>
								{/* <Clock className='w-5 h-5' />
								<div>{visit.prescription_expiry_date}</div> */}
							</div>
							<Separator />

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
								<div className='flex justify-center'>
									{visit.visit_data.odSphere}
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.odCyl}
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.odAxis}
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.odAdd}
								</div>
							</div>

							<div className='grid grid-cols-5 gap-4 items-center text-sm'>
								<div className='font-semibold text-right'>
									OS (Left)
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.osSphere}
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.osCyl}
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.osAxis}
								</div>
								<div className='flex justify-center'>
									{visit.visit_data.osAdd}
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4'>
								<h3 className='font-semibold text-sm'>
									Lens Details
								</h3>
								<div className='ml-5 space-y-2 text-sm'>
									<p className='text-muted-foreground'>
										Type: {visit.visit_data.lensType}
									</p>
								</div>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button onClick={handleView}>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ViewPrescriptionDialog
