import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function UserServices() {
	const axiosPrivate = useAxiosPrivate()

	const getAllUsers = async signal => {
		const response = await axiosPrivate.get(`/users/accounts`, {
			signal,
		})
		return response.data
	}

	const getUser = async (id, signal) => {
		const response = await axiosPrivate.get(`/users/accounts/${id}`)
		return response.data
	}

	const addUsers = async data => {
		const response = await axiosPrivate.post(`/users/register`, data)
		return response.data
	}

	const editUsers = async (data, id) => {
		// console.log(`/patients/profile/${id}`)
		// console.log(data)
		const response = await axiosPrivate.put(`/users/accounts/${id}`, data)
		return response.data
	}
	const deactivateUser = async id => {
		const response = await axiosPrivate.put(
			`/users/deactivate-account/${id}`
		)
		return response.data
	}

	const activateUser = async id => {
		const response = await axiosPrivate.put(`/users/activate-account/${id}`)
		return response.data
	}

	const changeUserPassword = async (data, id) => {
		// console.log(`/patients/profile/${id}`)
		//console.log(data)
		const response = await axiosPrivate.put(
			`/users/change-password/${id}`,
			data
		)
		return response.data
	}
	return {
		getAllUsers,
		addUsers,
		editUsers,
		getUser,
		changeUserPassword,
		deactivateUser,
		activateUser,
	}
}

export default UserServices
