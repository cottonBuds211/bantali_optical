import { useEffect, useState, useContext } from 'react'
import {
	Card,
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import PrescriptionCard from './PrescriptionCard'
import VisitServices from '@/services/visitServices'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { usePatient } from '@/context/PatientContext'
const PrescriptionTab = () => {
	const { patient } = usePatient()
	const [visits, setVisits] = useState([])
	const visitServices = new VisitServices()
	const { toast } = useToast()
	const navigate = useNavigate()
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getVisits = async () => {
			try {
				const visits = await visitServices.getAllVisits(
					patient.patient_id,
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
				if (err.code !== 'ERR_CANCELED') {
					toast({
						title: 'Session Expired',
						description:
							'Your session has expired please log-in again!',
					})
					navigate('/login', {
						state: { from: location },
						replace: true,
					})
				}
			}
		}
		getVisits()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [patient])

	return (
		<Card className='flex flex-grow flex-col '>
			<CardHeader className='flex flex-col justify-between lg:flex-row'>
				<div>
					<CardTitle>Lens Prescriptions</CardTitle>
					<CardDescription>
						Current and past eyewear prescriptions for the patient.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{Object.entries(visits)
					.reverse()
					.map(([year, visit]) => (
						<div key={year}>
							<p className='text-md font-semibold mb-2'>{year}</p>
							<Separator />
							<div className='flex flex-col gap-1 '>
								{visit.map((visit, index) => (
									<PrescriptionCard
										key={index}
										visit={visit}
									/>
								))}
							</div>
						</div>
					))}
			</CardContent>
		</Card>
	)
}

export default PrescriptionTab
