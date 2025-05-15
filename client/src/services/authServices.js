import axios from '@/api/axios'

const login = async data => {
	const response = await axios.post(`/auth/login`, data, {
		withCredentials: true,
	})
	return response.data
}
const forgotPassword = async email => {
	const response = await axios.post(
		`/auth/request-temp-password`,
		{ email },
		{
			withCredentials: true,
		}
	)
	return response.data
}

const refresh = async () => {
	const response = await axios.get(`/auth/refresh`, {
		withCredentials: true,
	})
	return response.data
}

const logout = async () => {
	const response = await axios.get(`/auth/logout`, {
		withCredentials: true,
	})
	return response.data
}

export default { login, refresh, logout, forgotPassword }
