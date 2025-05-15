import { createContext, useState, useEffect, useRef, useContext } from 'react'
import io from 'socket.io-client'
import NotificationServices from '@/services/notificationsServices'
import useAuth from '@/hooks/useAuth'

const NotificationContext = createContext({})

const NotificationProvider = ({ children }) => {
	const { loggedIn } = useAuth()
	const [loading, setLoading] = useState(true)
	const socketRef = useRef(null)
	const [notifications, setNotifications] = useState([])
	const notificationServices = new NotificationServices()
	const [notifRefresh, setNotifRefresh] = useState(false)

	// Fetch notifications effect
	useEffect(() => {
		const getNotifications = async () => {
			try {
				const notifications =
					await notificationServices.getNotifications()
				notifications?.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				)
				setNotifications(notifications)
			} catch (err) {
				console.error('Error fetching notifications:', err)
			} finally {
				setLoading(false)
			}
		}

		if (loggedIn) {
			getNotifications()
		}
		return () => {
			setNotifRefresh(false)
		}
	}, [notifRefresh]) // This dependency will control when notifications are fetched

	// Socket connection effect
	useEffect(() => {
		socketRef.current = io.connect('http://localhost:3002')
		socketRef.current.emit('admin-connected')
		setNotifRefresh(true)

		socketRef.current.on('appointment-notification', notificationData => {
			console.log('New appointment notification:', notificationData)
			setNotifications(prev => [...prev, notificationData])
		})

		return () => {
			socketRef.current.off('appointment-notification')
			socketRef.current.disconnect()
		}
	}, [])

	const markNotificationAsRead = async id => {
		try {
			await notificationServices.markAsRead(id) // Use the correct service
			setNotifications(prev =>
				prev.map(notification =>
					notification.id === id
						? { ...notification, is_read: true } // Update the specific notification
						: notification
				)
			)
		} catch (e) {
			console.error('Error marking notification as read:', e)
		}
	}

	const markAllNotificationsAsRead = async () => {
		try {
			await notificationServices.markAllAsRead()
			setNotifications(prev =>
				prev.map(notification => ({ ...notification, is_read: true }))
			)
		} catch (e) {
			console.log('Error marking all notifications as read:', e)
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

const useNotification = () => {
	const context = useContext(NotificationContext)
	if (context === undefined) {
		throw new Error(
			'useNotification must be used within a Notification Provider'
		)
	}
	return context
}

export { NotificationProvider, useNotification }
