import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function PatientServices() {
	const axiosPrivate = useAxiosPrivate()

	const getAllPatients = async signal => {
		const response = await axiosPrivate.get('/patients', { signal })
		return response.data
	}
	const getArchivedPatients = async signal => {
		const response = await axiosPrivate.get('/patients/archived', {
			signal,
		})
		return response.data
	}

	const getPatient = async (id, signal) => {
		//console.log('service', id)
		const response = await axiosPrivate.get(`/patients/profile/${id}`, {
			signal,
		})
		return response.data
	}

	//match patient
	const checkForPatientMatch = async (data, signal) => {
		console.log(data)
		const response = await axiosPrivate.get(
			`/patients/check-for-match?first_name=${encodeURIComponent(
				data.first_name
			)}&last_name=${encodeURIComponent(data.last_name)} `,

			{
				signal,
			}
		)
		return response.data
	}

	const addPatient = async data => {
		const response = await axiosPrivate.post(`/patients/`, data)
		return response.data
	}

	const editPatient = async (data, id) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		const response = await axiosPrivate.put(`/patients/profile/${id}`, data)
		return response.data
	}
	const archivePatient = async (id, userId) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)

		const response = await axiosPrivate.put(`/patients/archive/${id}`, {
			userId,
		})
		return response.data
	}
	const deletePatient = async (id, userId) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		console.log('user', userId)
		const response = await axiosPrivate.delete(
			`/patients/delete/${id}/${userId}`
		)
		return response.data
	}
	return {
		getAllPatients,
		getPatient,
		addPatient,
		editPatient,
		archivePatient,
		getArchivedPatients,
		deletePatient,
		checkForPatientMatch,
	}
}

export default PatientServices
