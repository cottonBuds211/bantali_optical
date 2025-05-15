import { useToast } from '@/components/ui/use-toast'
import { useState, createContext, useEffect } from 'react'
import authServices from '@/services/authServices'
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const { toast } = useToast()


	const getStoredValue = (key, defaultValue) => {
		try {
			const storedValue = localStorage.getItem(key)
			return storedValue ? JSON.parse(storedValue) : defaultValue
		} catch (error) {
			console.error(`Error parsing ${key}:`, error)
			return defaultValue
		}
	}

	


	const [auth, setAuth] = useState({ user: null, accessToken: null })
	const [persist, setPersist] = useState(() => getStoredValue('persist', false))

	const [isSubmitting, setIsSubmitting] = useState(false)

	const [loggedIn, setIsLoggedIn] = useState(() => getStoredValue('loggedIn', false))

	useEffect(() => {
		if (persist) {
			localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
		} else {
			localStorage.removeItem('loggedIn'); // Remove if persist is false
		}
	}, [loggedIn, persist]);


	const login = async data => {
		try {
			const response = await authServices.login(data)
			const { accessToken, user } = response
			toast({
				title: 'Success',
				description: `${user.user_name} logged in`,
				duration: 3000,
			})
			setIsLoggedIn(true)
			setAuth({ user, accessToken })

			if(persist){
				localStorage.setItem('loggedIn', JSON.stringify(true))
			}

			return true
		} catch (err) {
			console.log(err)
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: 'Username or password incorrect',
				duration: 3000,
			})
			return false

		} finally {
			setIsSubmitting(false)
		}
	}
	const onForgotPassword = async form => {
		try {
			console.log(form.getValues('email'))
			const response = await authServices.forgotPassword(
				form.getValues('email')
			)
			console.log(response)
			toast({
				title: 'Temp password',
				description: response.message,
				duration: 3000,
			})
		} catch (err) {
			console.log(err)
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: err.response.data,
				duration: 3000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				persist,
				setPersist,
				setIsLoggedIn,
				loggedIn,
				isSubmitting,
				setIsSubmitting,
				login,
				onForgotPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
