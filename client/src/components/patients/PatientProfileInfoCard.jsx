import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import EditPatientDialog from '../forms/EditPatientDialog'
import utils from '@/utils/helper'
import PatientServices from '@/services/patientServices'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '../ui/badge'
import {
	User,
	Calendar,
	Edit,
	Archive,
	MoreVertical,
	Home,
	Heart,
	Mail,
	Phone,
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmationDialog } from '../ConfirmationDialog'
import { useToast } from '../ui/use-toast'
import { usePatient } from '@/context/PatientContext'
import useAuth from '@/hooks/useAuth'
import { Separator } from '../ui/separator'
const PatientProfileInfoCard = () => {
	const { auth } = useAuth()
	const patientServices = new PatientServices()
	const { toast } = useToast()
	const { patient } = usePatient()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const [onDelete, setOnDelete] = useState(false)

	const handleArchivePatient = async () => {
		const patientUpdate = await patientServices.archivePatient(
			patient.patient_id,
			auth.user.user_id
		)
		toast({
			title: 'Archived',
			description: 'Patient has been archived successfully!',
		})
		navigate('/patients')
		patientUpdate()
	}
	const handleEditPatient = async () => {
		setOpen(!open)
	}
	return (
		<>
			<Card>
				<CardHeader className='p-4 sm:p-6'>
					<div className='flex flex-col sm:flex-row items-start gap-4'>
						<Avatar className='w-24 h-24 mx-auto sm:mx-0'>
							<AvatarImage
								src={`${
									patient.gender === 'Male'
										? '/src/assets/man.png'
										: '/src/assets/woman.png'
								}`}
								alt={
									patient.first_name + ' ' + patient.last_name
								}
							/>
							<AvatarFallback>
								{patient.first_name +
									' ' +
									patient.last_name
										.split(' ')
										.map(n => n[0])
										.join('')}
							</AvatarFallback>
						</Avatar>
						<div className='flex-grow space-y-2 text-center sm:text-left'>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
								<CardTitle className='text-2xl'>
									{patient.first_name +
										' ' +
										patient.last_name}
								</CardTitle>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='ghost' size='icon'>
											<MoreVertical className='h-4 w-4' />
											<span className='sr-only'>
												Open menu
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuItem
											onClick={handleEditPatient}
										>
											<Edit className='mr-2 h-4 w-4' />
											Edit
										</DropdownMenuItem>

										<DropdownMenuItem
											onClick={() =>
												setOnDelete(!onDelete)
											}
										>
											<Archive className='mr-2 h-4 w-4' />
											Archive Patient
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<ConfirmationDialog
									title='Archive Patient'
									description='Are you sure you want to archive this patient? You can still restore them after this.'
									confirmText='Archive'
									onConfirm={handleArchivePatient}
									open={onDelete}
									setOpen={setOnDelete}
									destructive={true}
								></ConfirmationDialog>
							</div>
							<CardDescription>
								<div className='flex flex-wrap justify-center sm:justify-start gap-2'>
									<Badge variant='secondary'>
										<User className='w-4 h-4 mr-1' />
										{patient.gender}
									</Badge>
									<Badge variant='secondary'>
										<Calendar className='w-4 h-4 mr-1' />
										{utils.getAge(
											patient?.date_of_birth
										)}{' '}
										years old
									</Badge>
								</div>
							</CardDescription>
						</div>
					</div>
					<div className='mt-4 grid gap-4'>
						<div className='text-muted-foreground'>
							<div className='flex items-center gap-2 text-sm'>
								<Mail className='w-4 h-4 text-red-300' />
								<span>
									{patient.email || 'No email provided'}
								</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<Phone className='w-4 h-4 text-green-500' />
								<span>{patient.contact_number}</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<Home className='w-4 h-4 ' />
								<span>{patient.address}</span>
							</div>
						</div>
						<div className='flex flex-row gap-2'>
							<div>
								<h4 className='text-sm font-medium '>
									Medical Conditions:
								</h4>
								<div className='flex flex-wrap gap-1'>
									{patient.medical_conditions ? (
										patient.medical_conditions
											.split(' ')
											.map((condition, index) => (
												<Badge
													key={index}
													variant='outline'
												>
													<Heart className='w-3 h-3 mr-1 text-red-500' />
													{condition}
												</Badge>
											))
									) : (
										<span className='text-sm text-muted-foreground'>
											No medical conditions reported
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>
			<EditPatientDialog open={open} setOpen={setOpen} />
		</>
	)
}

export default PatientProfileInfoCard
