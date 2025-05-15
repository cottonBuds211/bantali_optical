import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function CheckUpServices() {
	const axiosPrivate = useAxiosPrivate()

	const getCheckUp = async (visitId, signal) => {
		const response = await axiosPrivate.get(`/checkup/${visitId}`, {
			signal,
		})
		return response.data
	}

	const addCheckUp = async data => {
		const response = await axiosPrivate.post(`/checkup/`, data)
		return response.data
	}

	const editCheckUps = async (data, id) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		const response = await axiosPrivate.put(`/patients/profile/${id}`, data)
		return response.data
	}
	return {
		getCheckUp,
		addCheckUp,
		editCheckUps,
	}
}

export default CheckUpServices
