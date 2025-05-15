import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import utils from '@/utils/helper'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { Calendar, Users, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import man from '@/assets/man.png'
import woman from '@/assets/woman.png'
import { Badge } from '../ui/badge'

const PatientCard = ({ patient }) => {
	return (
		<Link to={`profile/${patient.patient_id}`} className='block w-full'>
			<Card className='w-full hover:shadow-xl transition-all duration-300'>
				<CardHeader className='flex items-center gap-4 p-4'>
					<Avatar className='mt-5 h-24 w-24'>
						<AvatarImage
							src={patient.gender === 'Male' ? man : woman}
							alt='Patient avatar'
						/>
						<AvatarFallback>
							{`${patient.first_name[0]}${patient.last_name[0]}`}
						</AvatarFallback>
					</Avatar>
					<div className='space-y-1 text-center  sm:text-left'>
						<span className='flex justify-center text-md font-semibold '>
							{`${patient.first_name} ${patient.last_name}`}
						</span>
						<div className='flex flex-wrap justify-center sm:justify-start items-center gap-2 text-sm text-muted-foreground'>
							<Badge
								variant='secondary'
								className='flex flex-row gap-2'
							>
								<Users className='h-4 w-4' />
								<span>{patient.gender}</span>
							</Badge>

							<Badge
								variant='secondary'
								className='flex flex-row gap-2'
							>
								<Calendar className='h-4 w-4' />
								<span>
									{utils.getAge(patient.date_of_birth)} years
									old
								</span>
							</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent className='space-y-4 p-4'>
					<div className='container grid gap-2'>
						<div className='text-xs font-medium uppercase text-muted-foreground text-center sm:text-left'>
							Contact Details
						</div>
						<div className='flex flex-col  gap-2 text-xs text-muted-foreground'>
							<div className='flex items-center gap-2'>
								<Phone className='h-4 w-4 text-green-500' />
								<span>{patient.contact_number}</span>
							</div>
							<div className='flex items-center gap-2'>
								<Mail className='h-4 w-4 text-red-300' />
								<span>{patient.email || 'None Provided'}</span>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className='p-4'>
					<span className='w-full flex justify-center text-sm items-center font-normal text-muted-foreground/60'>
						View Patient
					</span>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default PatientCard
