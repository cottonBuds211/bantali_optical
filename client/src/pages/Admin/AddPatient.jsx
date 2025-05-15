import { ChevronLeft } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import { Button } from '@/components/ui/button'

import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import AddPatientForm from '@/components/forms/AddPatientForm'
import { useNavigate } from 'react-router-dom'
const AddPatient = () => {
	const navigate = useNavigate()
	return (
		<>
			<PageWrapper
				title={'Patients'}
				button={
					<Button
						className='rounded-full h-8 w-8'
						size='icon'
						variant='outline'
						onClick={() =>
							confirm('You will lose all data') &&
							navigate(`/patients`)
						}
					>
						<ChevronLeft />
					</Button>
				}
			>
				<div className=' w-full mx-0 lg:max-w-2xl lg:mx-auto flex flex-col justify-center'>
					<CardHeader>
						<CardTitle>Add Patient</CardTitle>
						<CardDescription>
							Add patient to the database
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AddPatientForm />
					</CardContent>
				</div>
			</PageWrapper>
		</>
	)
}

export default AddPatient
