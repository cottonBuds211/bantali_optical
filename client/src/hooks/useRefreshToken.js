import authServices from '@/services/authServices'
import useAuth from './useAuth'
import useLogout from './useLogout'

const useRefreshToken = () => {
	const { setAuth } = useAuth()
	const logout = useLogout()
	const refresh = async () => {
		try {
			const { accessToken, user } = await authServices.refresh()
			//console.log({ accessToken, user })
			setAuth(prev => ({ ...prev, user, accessToken }))
			return { accessToken, user }
		} catch (error) {
			// Handle errors here (e.g., log errors, display user messages)
			logout()
			console.error('Error refreshing token:', error)
			return null // Or return a default value if necessary
		}
	}
	return refresh
}

export default useRefreshToken
