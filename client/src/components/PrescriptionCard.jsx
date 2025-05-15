import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from './ui/dropdown-menu'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { MoreHorizontal, CalendarIcon, Trash2, Eye } from 'lucide-react'
import ViewPrescriptionDialog from './ViewPrescriptionDialog'
import { useState } from 'react'
const PrescriptionCard = ({ prescription }) => {
	const prescriptionDate = new Date(prescription?.prescription_date)
	const now = new Date()
	const [prescrip, setPrescrip] = useState(null)

	const handleView = () => {
		setPrescrip(prescription)
	}
	return (
		<>
			{prescription && (
				<Card className='h-fit my-2 py-2 flex w-full items-center'>
					{/* <div className='flex flex-row mx-2 pl-5 items-center'>
						<EyeIcon className='h-5 w-5 text-gray-400' />
					</div> */}
					{/* <CardTitle className='flex-shrink-0 text-md '>
						Lens Prescription
					</CardTitle> */}
					{/* <Separator orientation='vertical' /> */}
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-col gap-1 mx-5 p-3'>
							<span className='text-sm font-semibold'>
								Lense Prescription
							</span>

							<div className='flex flex-row gap-2 items-center '>
								<CalendarIcon className='w-4 h-4 text-muted-foreground ' />
								<span className='text-sm text-gray-500'>
									{prescriptionDate.toLocaleString('en-US', {
										month: 'long',
										year: 'numeric',
										day: 'numeric',
									})}
								</span>
							</div>
							<div className=' flex flex-row gap-2 items-center'>
								<Badge
									variant={
										now >
										new Date(
											prescription.prescription_expiry_date
										)
											? 'destructive'
											: 'outline'
									}
								>
									{now >
									new Date(
										prescription.prescription_expiry_date
									)
										? 'Expired'
										: 'Active'}
								</Badge>
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							<div className='w-4 h-4 mx-5 flex flex-row gap-2 items-center'>
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button
											variant='ghost'
											className='h-8 w-8 p-0'
										>
											<span className='sr-only'>
												Open menu
											</span>
											<MoreHorizontal className='h-4 w-4' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuItem
											className='flex items-center'
											onSelect={() => handleView()}
										>
											<Eye className='mr-2 h-4 w-4' />
											View
										</DropdownMenuItem>
										<DropdownMenuItem className='flex items-center text-red-600 focus:text-red-600 focus:bg-red-100'>
											<Trash2 className='mr-2 h-4 w-4' />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
					<ViewPrescriptionDialog
						prescrip={prescrip}
						setPrescrip={setPrescrip}
					/>
				</Card>
			)}
		</>
	)
}

export default PrescriptionCard
