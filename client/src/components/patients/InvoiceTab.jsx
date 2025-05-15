import { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import BillingServices from '@/services/billingServices'
import {
	Card,
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import InvoiceCard from './InvoiceCard'
import { usePatient } from '@/context/PatientContext'

const InvoiceTab = () => {
	const { patient } = usePatient()
	const billingServices = new BillingServices()
	const [billings, setBillings] = useState([])
	const [refresh, setRefresh] = useState(false)
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getVisits = async () => {
			try {
				const billings = await billingServices.getAllBillingsForPatient(
					patient.patient_id,
					signal
				)
				billings.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

				// Group visits by year
				const groupedBillings = {}
				billings.forEach(billing => {
					const year = new Date(billing.createdAt).getFullYear()
					if (!groupedBillings[year]) {
						groupedBillings[year] = []
					}
					groupedBillings[year].push(billing)
				})
				//console.log(1, visits)
				isMounted && setBillings(groupedBillings)
			} catch (err) {
				console.error(err)
			}
		}
		getVisits()

		return () => {
			isMounted = false
			setRefresh(false)
			controller.abort()
		}
	}, [patient, refresh])
	return (
		<Card className='flex flex-grow flex-col '>
			<CardHeader className='flex flex-col justify-between lg:flex-row'>
				<div>
					<CardTitle>Patient Invoice</CardTitle>
					<CardDescription>
						Current and past eyewear prescriptions for the patient.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{Object.entries(billings)
					.reverse()
					.map(([year, billing]) => (
						<div key={year}>
							<p className='text-md font-semibold mb-2'>{year}</p>
							<Separator />
							<div className='flex flex-col gap-2 '>
								{billing.map((b, index) => (
									<InvoiceCard
										key={index}
										billing={b}
										setRefresh={setRefresh}
									/>
								))}
							</div>
						</div>
					))}
			</CardContent>
		</Card>
	)
}

export default InvoiceTab
