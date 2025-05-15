import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '@/hooks/useRefreshToken'
import useAuth from '@/hooks/useAuth'
import 'ldrs/ring'
import useLogout from '@/hooks/useLogout'
const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true)
	const refresh = useRefreshToken()
	const { auth, persist, setAuth } = useAuth()

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh()
			} catch (err) {
				console.err(err)
			} finally {
				setIsLoading(false)
			}
		}
		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
	}, [])

	// removeLater
	// useEffect(() => {
	// 	console.log(`loading: ${isLoading}`, auth?.accessToken)
	// }, [isLoading])

	return (
		<>
			{!persist ? (
				<Outlet />
			) : isLoading ? (
				// Default values shown
				<div className='w-full h-screen flex justify-center items-center'>
					<l-ring
						size='40'
						stroke='5'
						bg-opacity='0'
						speed='2'
						color='black'
					></l-ring>
				</div>
			) : (
				<Outlet />
			)}
		</>
	)
}

export default PersistLogin
