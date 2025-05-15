import { Glasses, MapPin } from 'lucide-react'
import { Clock } from 'lucide-react'
import { MoreHorizontal, Eye, CalendarIcon } from 'lucide-react'
import { Card, CardTitle, CardHeader, CardDescription } from '../ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { useState } from 'react'
import ViewCheckUpDialog from './ViewCheckUpDialog'

const VisitationCard = ({ visit }) => {
	//console.log(visit)
	const [dialogOpen, setDialogOpen] = useState(false)
	const visitDate = new Date(visit?.visitation_date)
	const time = new Date(visit?.visitation_date + ' ' + visit?.visitation_time)
	const formattedTime = time.toLocaleTimeString('en-US', {
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
	})

	return (
		<>
			<Card
				onClick={() => setDialogOpen(true)}
				className='hover:bg-secondary/90 cursor-pointer'
			>
				<CardHeader>
					<CardTitle className='flex flex-row justify-between items-center text-xl'>
						<span className='inline-flex text-md items-center gap-2'>
							<Glasses className='w-5 h-5' />
							Visit
						</span>
						{/* <DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<span className='sr-only'>Open menu</span>
									<MoreHorizontal className='h-4 w-4' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem
									className='flex items-center'
									onSelect={() => setDialogOpen(true)}
								>
									<Eye className='mr-2 h-4 w-4' />
									View
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu> */}
					</CardTitle>
					<CardDescription>
						<div className='flex flex-row gap-2 items-center '>
							<CalendarIcon className='w-4 h-4 text-muted-foreground ' />
							<span className='text-sm text-gray-500'>
								{visitDate.toLocaleString('en-US', {
									month: 'long',
									year: 'numeric',
									day: 'numeric',
								})}
							</span>
							<Clock className='w-4 h-4 text-muted-foreground ' />
							<span className='text-sm text-gray-500'>
								{formattedTime}
							</span>
						</div>
						<div className=' flex flex-row gap-2 items-center'>
							<MapPin className='w-4 h-4 text-muted-foreground ' />
							<p className='text-sm'>Walk-in</p>
						</div>
					</CardDescription>
				</CardHeader>
			</Card>
			<ViewCheckUpDialog
				visit={visit}
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
			/>
		</>
	)
}

export default VisitationCard
