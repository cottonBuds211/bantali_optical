import { useEffect, useState, useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import VisitServices from '@/services/visitServices'
import VisitationCard from './VisitationCard'
import { Separator } from './ui/separator'
import VisitationButton from './forms/VisitationButton'
import { PatientContext } from './PatientProfile'

const VisitationTab = () => {
	const { patient } = useContext(PatientContext)

	const visitServices = new VisitServices()
	const [visits, setVisits] = useState([])
	const [success, setSuccess] = useState(false)

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
			}
		}
		getVisits()

		return () => {
			isMounted = false
			controller.abort()
			setSuccess(null)
		}
	}, [patient, success])
	return (
		<Card className='flex flex-grow flex-col '>
			<CardHeader className='flex flex-col justify-between '>
				<CardTitle className='flex items-center'>
					<p className='text-xl'>Visitation History</p>
				</CardTitle>
				<VisitationButton setSuccess={setSuccess} success={success} />
			</CardHeader>
			<CardContent className='mx-5 pr-5 mb-5 gap-2'>
				{Object.entries(visits).map(([year, visits]) => (
					<div key={year}>
						<p className='text-md font-semibold mb-2'>{year}</p>
						<Separator />
						<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-2 mb-5 gap-2 '>
							{visits.map((visit, index) => (
								<VisitationCard key={index} visit={visit} />
							))}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export default VisitationTab
