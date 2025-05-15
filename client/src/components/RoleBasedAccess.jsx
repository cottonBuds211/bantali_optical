import useAuth from '@/hooks/useAuth'
import React from 'react'

const RoleBasedAccess = ({ roles, children }) => {
	const { auth } = useAuth()
	console.log(roles)
	console.log(auth.user.role)
	if (!auth.user || !roles.some(role => auth.user.role.includes(role))) {
		return <div>You do not have permission to view this page.</div>
	}
	return <div>{children}</div>
}

export default RoleBasedAccess
