import { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '../ui/card'
import VisitServices from '@/services/visitServices'
import VisitationCard from './VisitationCard'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { CirclePlus, PlusIcon } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePatient } from '@/context/PatientContext'
const VisitationTab = () => {
	const { patient } = usePatient()
	const visitServices = new VisitServices()
	const [visits, setVisits] = useState([])
	const [success, setSuccess] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getVisits = async () => {
			try {
				const visits = await visitServices.getAllVisits(
					patient?.patient_id,
					signal
				)
				visits.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

				// Group visits by year
				const groupedVisits = {}
				visits.forEach(visit => {
					const year = new Date(visit.visitation_date).getFullYear()
					if (!groupedVisits[year]) {
						groupedVisits[year] = []
					}
					groupedVisits[year].push(visit)
				})
				//console.log(1, visits)
				isMounted && setVisits(groupedVisits)
			} catch (err) {
				console.error(err)
				// if (err.code !== 'ERR_CANCELED') {
				// 	toast({
				// 		title: 'Session Expired',
				// 		description:
				// 			'Your session has expired please log-in again!',
				// 	})
				// 	navigate('/login', {
				// 		state: { from: location },
				// 		replace: true,
				// 	})
				// }
			}
		}
		getVisits()

		return () => {
			isMounted = false
			controller.abort()
			setSuccess(null)
		}
	}, [patient, success])

	const handleAddVisit = () => {
		navigate(`/patients/profile/${patient.patient_id}/add-visit`)
	}

	return (
		<Card className='flex flex-grow flex-col '>
			<CardHeader className='flex flex-col lg:flex-row justify-between '>
				<div>
					<CardTitle>Eye Exam History</CardTitle>
					<CardDescription>
						Record of patient's eye examinations.
					</CardDescription>
				</div>
				<Button onClick={handleAddVisit}>
					<PlusIcon className='mr-2 h-4 w-4' />
					<p>Add Visitation</p>
				</Button>
			</CardHeader>
			<CardContent>
				{Object.entries(visits).map(([year, visits]) => (
					<div key={year}>
						<p className='text-md font-semibold mb-2'>{year}</p>
						<Separator />
						<div className='flex flex-col gap-1 '>
							{visits.map((visit, index) => (
								<VisitationCard
									key={index}
									visit={visit}
									setSuccess={setSuccess}
								/>
							))}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export default VisitationTab
