import { MapPin } from 'lucide-react'
import { Clock } from 'lucide-react'
import { Separator } from './ui/separator'
import { MoreHorizontal, Trash2, Eye, Edit, CalendarIcon } from 'lucide-react'
import { Card, CardTitle } from './ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useState } from 'react'
import CheckUpServices from '@/services/checkupServices'
import ViewCheckUpDialog from './ViewCheckUpDialog'
import ViewFollowUpDialog from './ViewFollowUpDialog'
import FollowUpServices from '@/services/followupServices'
import { Badge } from './ui/badge'

const VisitationCard = ({ visit }) => {
	//console.log(visit)
	const checkupServices = new CheckUpServices()
	const followupServices = new FollowUpServices()
	const visitDate = new Date(visit?.visitation_date)
	const time = new Date(visit?.visitation_date + ' ' + visit?.visitation_time)
	const formattedTime = time.toLocaleTimeString('en-US', {
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
	})
	const [checkUp, setCheckUp] = useState(null)
	const [followUp, setFollowUp] = useState(null)

	const handleView = async () => {
		if (visit.visitation_type === 'Check up') {
			try {
				const checkup = await checkupServices.getCheckUp(
					visit.visitation_id
				)
				console.log('checkUP:', checkup)
				setCheckUp(checkup)
			} catch (err) {
				console.error(err)
			}
		} else {
			try {
				const followup = await followupServices.getFollowUp(
					visit.visitation_id
				)
				console.log('followUp:', followup)
				setFollowUp(followup)
			} catch (err) {
				console.error(err)
			}
		}
	}
	return (
		<div>
			{visit && (
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
								{visit.visitation_type === 'Check up'
									? 'Check up'
									: 'Follow up'}
							</span>

							<div className='flex flex-row gap-2 items-center '>
								<CalendarIcon className='w-4 h-4 text-muted-foreground ' />
								<span className='text-sm text-gray-500'>
									{visitDate.toLocaleString('en-US', {
										month: 'long',
										year: 'numeric',
										day: 'numeric',
									})}
								</span>
							</div>
							<div className='flex flex-row gap-2 items-center'>
								<Clock className='w-4 h-4 text-muted-foreground ' />
								<span className='text-sm text-gray-500'>
									{formattedTime}
								</span>
							</div>
							<div className=' flex flex-row gap-2 items-center'>
								<MapPin className='w-4 h-4 text-muted-foreground ' />
								<p className='text-sm'>Walk-in</p>
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
					<ViewCheckUpDialog
						visit={visit}
						checkUp={checkUp}
						setCheckUp={setCheckUp}
					/>
					<ViewFollowUpDialog
						visit={visit}
						followUp={followUp}
						setFollowUp={setFollowUp}
					/>
				</Card>
			)}
		</div>
	)
}

export default VisitationCard
