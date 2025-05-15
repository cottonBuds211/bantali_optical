import { createContext, useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import NotificationServices from '@/services/notificationsServices'

const NotificationContext = createContext({})

export const NotificationProvider = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const socketRef = useRef(null)
	const [notifications, setNotifications] = useState(null)
	const notificationServices = new NotificationServices()
	const [notifRefresh, setNotifRefresh] = useState(false)

	useEffect(() => {
		let isMounted = true
		// const controller = new AbortController()
		// const signal = controller.signal

		const getNotifications = async () => {
			try {
				const notifications =
					await notificationServices.getNotifications()
				//console.log('Fetched notifications:', notifications) // Debugging

				if (isMounted) {
					notifications.sort((a, b) =>
						b.createdAt.localeCompare(a.createdAt)
					)
					setNotifications(notifications)
				}
			} catch (e) {
				console.error('Error fetching notifications:', e)
			} finally {
				if (isMounted) {
					setLoading(false)
				} // Turn off loading state after fetching completes
			}
		}
		getNotifications()
		return () => {
			isMounted = false
			setNotifRefresh(false)
			//controller.abort()
		}
	}, [notifRefresh])

	useEffect(() => {
		socketRef.current = io.connect('http://localhost:3002')
		socketRef.current.emit('admin-connected')

		socketRef.current.on('appointment-notification', notificationData => {
			//console.log('New appointment notification:', notificationData)
			setNotifications(prev => [notificationData, ...prev])
		})

		return () => {
			socketRef.current.off('appointment-notification')
			socketRef.current.disconnect() // Close the socket connection
		}
	}, [])

	const markNotificationAsRead = async id => {
		try {
			await notifications.markAsRead(id)
			setNotifications(prev =>
				prev.map(notification => ({
					...notification,
					is_read: true,
				}))
			)
		} catch (e) {
			console.error(e)
		}
	}

	const markAllNotificationsAsRead = async () => {
		try {
			await notificationServices.markAllAsRead()
			setNotifications(prev =>
				prev.map(notification => ({
					...notification,
					is_read: true,
				}))
			)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				markAllNotificationsAsRead,
				markNotificationAsRead,
				setNotifRefresh,
				notifRefresh,
				loading,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
