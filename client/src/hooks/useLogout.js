import useAuth from './useAuth'
import authServices from '@/services/authServices'
import { Navigate, useNavigate } from 'react-router-dom'
const useLogout = () => {
	const { setAuth, setIsLoggedIn } = useAuth()
	const navigate = useNavigate()
	const logout = async () => {
		setAuth({ user: null, accessToken: null })
		setIsLoggedIn(false)
		try {
			const response = await authServices.logout()
			navigate('/', {
				state: { from: location },
				replace: true,
			})
		} catch (err) {
			console.error(err)
		}
	}
	return logout
}

export default useLogout
