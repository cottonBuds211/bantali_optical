import useAxiosPrivate from '@/hooks/useAxiosPrivate'
function NotificationServices() {
	const axiosPrivate = useAxiosPrivate()

	const getNotifications = async signal => {
		const response = await axiosPrivate.get(`/notifications/`, {
			signal,
		})
		return response.data
	}

	// const addNotification = async data => {
	// 	const response = await axiosPrivate.post(`/notifications/`, data)
	// 	return response.data
	// }

	const markAsRead = async id => {
		const response = await axiosPrivate.put(
			`/notifications/mark-as-read/${id}`
		)
		return response.data
	}

	const markAllAsRead = async () => {
		const response = await axiosPrivate.put(`/notifications/mark-all-read`)
		return response.data
	}
	return {
		markAsRead,
		getNotifications,
		markAllAsRead,
	}
}

export default NotificationServices
