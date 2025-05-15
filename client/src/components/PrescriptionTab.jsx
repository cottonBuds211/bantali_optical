import { useEffect, useState, useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import PrescriptionButton from './forms/PrescriptionButton'
import { Separator } from './ui/separator'
import PrescriptionServices from '@/services/prescriptionServices'
import PrescriptionCard from './PrescriptionCard'
import { PatientContext } from './PatientProfile'

const PrescriptionTab = () => {
	const { patient } = useContext(PatientContext)
	const [success, setSuccess] = useState(false)
	const [prescriptions, setPrescriptions] = useState([])
	const prescriptionServices = new PrescriptionServices()

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal
		const getPrescriptions = async () => {
			try {
				const prescriptions =
					await prescriptionServices.getPrescriptions(
						patient.patient_id,
						signal
					)

				console.log(prescriptions)

				prescriptions.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				)

				// Group visits by year
				const groupedPrescriptions = {}
				prescriptions.forEach(p => {
					const year = new Date(p.prescription_date).getFullYear()
					if (!groupedPrescriptions[year]) {
						groupedPrescriptions[year] = []
					}
					groupedPrescriptions[year].push(p)
				})

				isMounted && setPrescriptions(groupedPrescriptions)
			} catch (e) {
				console.error(e)
			}
		}
		getPrescriptions()

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
					<p className='text-xl'>Prescription History</p>
				</CardTitle>
				<PrescriptionButton setSuccess={setSuccess} success={success} />
			</CardHeader>
			<CardContent>
				<div className='mx-5 pr-5 mb-5 gap-2 '>
					{Object.entries(prescriptions)
						.reverse()
						.map(([year, prescriptions]) => (
							<div key={year}>
								<p className='text-md font-semibold mb-2'>
									{year}
								</p>
								<Separator />
								<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-2 mb-5 gap-2 '>
									{prescriptions.map(
										(prescription, index) => (
											<PrescriptionCard
												key={index}
												prescription={prescription}
											/>
										)
									)}
								</div>
							</div>
						))}
				</div>
			</CardContent>
		</Card>
	)
}

export default PrescriptionTab
