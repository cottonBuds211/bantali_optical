import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function VisitServices() {
	const axiosPrivate = useAxiosPrivate()

	const getCompletedVisits = async signal => {
		const response = await axiosPrivate.get(`/visitation/`, { signal })
		return response.data
	}

	const getAllVisits = async (patientId, signal) => {
		const response = await axiosPrivate.get(`/visitation/${patientId}`, {
			signal,
		})
		return response.data
	}

	const getVisit = async (patientId, visitId, signal) => {
		const response = await axiosPrivate.get(
			`/visitation/${patientId}/${visitId}`,
			{
				signal,
			}
		)
		return response.data
	}

	const addVisit = async data => {
		const response = await axiosPrivate.post(`/visitation/`, data)
		return response.data
	}

	const editVisit = async (data, patientId, visitId) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		const response = await axiosPrivate.put(
			`/visitation/${patientId}/${visitId}`,
			data
		)
		return response.data
	}
	const deleteVisit = async (visitId, userId) => {
		const response = axiosPrivate.delete(`/visitation/${visitId}/${userId}`)
		return response.data
	}
	return {
		getAllVisits,
		getVisit,
		addVisit,
		editVisit,
		getCompletedVisits,
		deleteVisit,
	}
}

export default VisitServices
