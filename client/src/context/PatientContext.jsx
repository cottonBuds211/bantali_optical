import { useState, useEffect, createContext } from 'react'

import PatientServices from '@/services/patientServices'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useContext } from 'react'
const PatientContext = createContext({})

const PatientProvider = ({ children }) => {
	const params = useParams()
	const { toast } = useToast()
	// const navigate = useNavigate()
	// const location = useLocation()
	const patientServices = new PatientServices()
	const [patient, setPatient] = useState(() => {
		// Load from localStorage on initial render
		const storedPatient = localStorage.getItem('patient')
		return storedPatient ? JSON.parse(storedPatient) : null
	})
	const [succesPatient, setSuccessPatient] = useState()
	//console.log(patient)
	//console.log(params.patient_id)
	useEffect(() => {
		const getPatient = async () => {
			const response = await patientServices.getPatient(
				params.patient_id
				//signal
			)
			setPatient(response)

			if (response) {
				localStorage.setItem('patient', JSON.stringify(response))
			} else {
				localStorage.removeItem('patient')
			}
		}

		getPatient()

		return () => {}
	}, [succesPatient]) // Add necessary dependencies only

	console.log(patient)

	const editPatient = async data => {
		try {
			const editedPatient = await patientServices.editPatient(
				data,
				patient.patient_id
			)
			toast({
				title: 'Success',
				description: `${editedPatient.first_name}'s information has been edited`,
			})
			setSuccessPatient(true)
		} catch (err) {
			toast({
				title: 'Failed',
				description: err.response?.data.error,
			})
		}
	}

	return (
		<PatientContext.Provider
			value={{ patient, setSuccessPatient, editPatient }}
		>
			{children}
		</PatientContext.Provider>
	)
}
const usePatient = () => {
	const context = useContext(PatientContext)
	if (context === undefined) {
		throw new Error('usePatient must be used within a Patient Provider')
	}
	return context
}
export { PatientProvider, usePatient }
