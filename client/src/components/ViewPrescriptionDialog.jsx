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
import { useContext } from 'react'
import { PatientContext } from './PatientProfile'
const ViewPrescriptionDialog = ({ prescrip, setPrescrip }) => {
	const { patient } = useContext(PatientContext)
	return (
		<div>
			<Dialog
				open={prescrip !== null}
				onOpenChange={isOpen => !isOpen && setPrescrip(null)}
			>
				<DialogContent
					onInteractOutside={e => {
						e.preventDefault()
					}}
					className='w-11/12 sm:max-w-xl p-12'
				>
					<DialogHeader>
						<DialogTitle>Prescription Summary</DialogTitle>
						<DialogDescription>
							Review your prescription lens order details below.
						</DialogDescription>
					</DialogHeader>
					{prescrip && (
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-[20px_1fr] items-start gap-4 text-sm'>
								<User className='w-5 h-5' />
								<div>
									{patient.first_name} {patient.last_name}
								</div>
								<Calendar className='w-5 h-5' />
								<div>{prescrip.prescription_date}</div>
								<Clock className='w-5 h-5' />
								<div>{prescrip.prescription_expiry_date}</div>
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
									{prescrip.prescription_details.odSphere}
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.odCylinder}
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.odAxis}
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.odAdd}
								</div>
							</div>

							<div className='grid grid-cols-5 gap-4 items-center text-sm'>
								<div className='font-semibold text-right'>
									OS (Left)
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.osSphere}
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.osCylinder}
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.osAxis}
								</div>
								<div className='flex justify-center'>
									{prescrip.prescription_details.osAdd}
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4'>
								<h3 className='font-semibold text-sm'>
									Lens Details
								</h3>
								<div className='ml-5 space-y-2 text-sm'>
									<p className='text-muted-foreground'>
										Type:{' '}
										{prescrip.prescription_details.lensType}
									</p>
								</div>
								<h3 className='font-semibold text-sm'>
									Frame Details
								</h3>
								<div className='ml-5 space-y-2 text-sm'>
									<p className='text-muted-foreground'>
										Material:{' '}
										{
											prescrip.prescription_details
												.frameMaterial
										}
									</p>
									<p className='text-muted-foreground'>
										Model:{' '}
										{
											prescrip.prescription_details
												.frameModel
										}
									</p>
								</div>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button onClick={() => setPrescrip(null)}>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ViewPrescriptionDialog
