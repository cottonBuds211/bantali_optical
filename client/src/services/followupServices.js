import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function FollowUpServices() {
	const axiosPrivate = useAxiosPrivate()

	const getFollowUp = async (visitId, signal) => {
		const response = await axiosPrivate.get(`/followup/${visitId}`, {
			signal,
		})
		return response.data
	}

	const addFollowUp = async data => {
		const response = await axiosPrivate.post(`/followup/`, data)
		return response.data
	}

	const editFollowUp = async (data, id) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		const response = await axiosPrivate.put(`/followup/${id}`, data)
		return response.data
	}
	return {
		getFollowUp,
		addFollowUp,
		editFollowUp,
	}
}

export default FollowUpServices
