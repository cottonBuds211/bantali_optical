import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function PrescriptionServices() {
	const axiosPrivate = useAxiosPrivate()

	const getPrescriptions = async (patientId, signal) => {
		const response = await axiosPrivate.get(`/prescription/${patientId}`, {
			signal,
		})
		return response.data
	}

	const getPrescription = async (patientId, prescriptionId, signal) => {
		const response = await axiosPrivate.get(
			`/prescription/${patientId}/${prescriptionId}`,
			{
				signal,
			}
		)
		return response.data
	}

	const addPrescription = async data => {
		const response = await axiosPrivate.post(`/prescription/`, data)
		return response.data
	}

	const editPrescription = async (data, id) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		const response = await axiosPrivate.put(`/patients/profile/${id}`, data)
		return response.data
	}
	return {
		getPrescription,
		getPrescriptions,
		addPrescription,
		editPrescription,
	}
}

export default PrescriptionServices
