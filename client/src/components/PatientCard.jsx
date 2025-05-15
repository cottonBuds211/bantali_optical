import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import utils from '@/utils/helper'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { CalendarIcon, GroupIcon, PhoneIcon, MailIcon } from 'lucide-react'
import { Button } from './ui/button'

const PatientCard = ({ patient }) => {
	return (
		<Link to={`profile/${patient.patient_id}`}>
			<Card className='w-[280px] max-w-sm hover:bg-secondary/90'>
				<CardHeader className='w-full items-center gap-4 p-4 pt-5 sm:w-auto'>
					<Avatar className='h-16 w-16 mt-5'>
						<AvatarImage
							src={`${
								patient.gender === 'Male'
									? '../src/assets/man.png'
									: '../src/assets/woman.png'
							}`}
							alt='Patient avatar'
						/>
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div className='space-y-1'>
						<div className='text-lg font-semibold'>
							{patient.first_name +
								' ' +
								patient.middle_name +
								' ' +
								patient.last_name}
						</div>
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<GroupIcon className='h-4 w-4' />
							{patient.gender}
							<Separator orientation='vertical' className='h-4' />
							<CalendarIcon className='h-4 w-4' />
							{utils.getAge(patient.date_of_birth)} years old
						</div>
					</div>
				</CardHeader>
				<CardContent className='space-y-4 p-4 px-10'>
					<div className='grid gap-1'>
						<div className='text-xs font-medium uppercase text-muted-foreground'>
							Contact Details
						</div>
						<div className='flex items-center gap-2 text-xs text-muted-foreground'>
							<PhoneIcon className='h-4 w-4 ' />
							{patient.contact_number}
						</div>
						<div className='flex items-center gap-2 text-xs text-muted-foreground'>
							<MailIcon className='h-4 w-4 ' />
							{patient.email ? patient.email : 'None Provided'}
						</div>
					</div>
				</CardContent>
				<CardFooter className='p-4 px-10'>
					<Button
						className='w-full font-normal text-muted-foreground'
						variant='none'
					>
						View Patient
					</Button>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default PatientCard
