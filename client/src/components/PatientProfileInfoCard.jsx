import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from '@/components/ui/button'
import EditPatientButton from './forms/EditPatientButton'
import { format } from 'date-fns'
import utils from '@/utils/helper'
import { useContext } from 'react'
import { PatientContext } from './PatientProfile'
import PatientServices from '@/services/patientServices'
import { useNavigate } from 'react-router-dom'
const PatientProfileInfoCard = () => {
	const patientServices = new PatientServices()
	const { patient } = useContext(PatientContext)
	const navigate = useNavigate()

	const archivePatient = async () => {
		if (confirm('Archive this patient')) {
			const patientUpdate = await patientServices.editPatient(
				{
					active: false,
				},
				patient.patient_id
			)

			patientUpdate()
			navigate('/patients')
		}
	}
	return (
		<>
			<Card className='lg:w-[380px] md:w-full sm:w-full flex-grow p-5'>
				<CardHeader>
					<div className='flex flex-col  items-center justify-between gap-4'>
						<div className='flex flex-row gap-4'>
							<img
								src={`${
									patient.gender === 'Male'
										? '/src/assets/man.png'
										: '/src/assets/woman.png'
								}`}
								alt='Patient'
								width={70}
								height={70}
								className='rounded-full'
								style={{
									aspectRatio: '80/80',
									objectFit: 'cover',
								}}
							/>
							<div className='grid gap-1'>
								<CardTitle>
									{patient.first_name +
										' ' +
										patient.middle_name +
										' ' +
										patient.last_name}
								</CardTitle>
								<div className='text-sm text-muted-foreground'>
									Age: {utils.getAge(patient?.date_of_birth)}{' '}
									| Gender: {patient.gender}
								</div>
							</div>
						</div>
						<div className='flex items-center w-full gap-4'>
							<EditPatientButton />
							<Button
								variant='secondary'
								className='w-full'
								onClick={archivePatient}
							>
								Archive
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='flex items-center gap-4'>
							<div className='grid gap-1'>
								<div className='text-sm font-medium text-muted-foreground'>
									Address
								</div>
								<div className='text-sm'>{patient.address}</div>
							</div>
						</div>
						<div>
							<div className='text-sm font-medium text-muted-foreground'>
								Birthdate
							</div>

							{patient?.date_of_birth && (
								<div className='text-sm'>
									{format(patient.date_of_birth, 'PPP')}
								</div>
							)}
						</div>
						<div>
							<div className='text-sm font-medium text-muted-foreground'>
								Contact Information
							</div>
							<div className='text-sm'>
								Email:{' '}
								{patient.email
									? patient.email
									: 'None Provided'}
								<br />
								Phone: {patient.contact_number}
							</div>
						</div>
						<div>
							<div className='text-sm font-medium text-muted-foreground'>
								Medical History
							</div>
							{patient.medical_conditions ? (
								<div className='text-sm'>
									{patient.medical_conditions}
								</div>
							) : (
								<div className='text-sm'>None</div>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button className='w-full'>Export Data</Button>
				</CardFooter>
			</Card>
		</>
	)
}

export default PatientProfileInfoCard
