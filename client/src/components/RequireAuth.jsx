import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

const RequireAuth = () => {
	const { auth } = useAuth()
	//console.log(auth)
	const location = useLocation()
	//console.log(auth)
	return auth?.user ? (
		<Outlet />
	) : (
		<Navigate to='/' state={{ from: location }} replace />
	)
}

export default RequireAuth
