const notificationRouter = require('express').Router()
const db = require('../models')
const { Notification, Appointment } = db

notificationRouter.get('/', async (req, res, next) => {
	const notifications = await Notification.findAll({
		include: [
			{
				model: Appointment, // Assuming your Notification model is associated with Appointment
				where: {
					status: 'Pending', // Only include notifications for Pending appointments
				},
			},
		],
	})
	if (!notifications) {
		res.status(400).json({ message: `No notifications` })
	}
	//console.log(notifications)
	res.status(200).json(notifications)
})

notificationRouter.get('/:id', async (req, res, next) => {
	const id = req.params.id
	const notification = await Notification.findByPk(id)
	if (!notification) {
		res.status(400).json({ message: `notification not found` })
	} else {
		res.status(200).json({ notification })
	}
})

// notificationRouter.post('/', async (req, res, next) => {
// 	const data = req.body
// 	const newNotification = await Notification.create(data)

// 	res.status(201).json(newNotification)
// })

notificationRouter.put('/mark-as-read/:id', async (req, res, next) => {
	const id = req.params.id

	const notification = await Notification.findByPk(id)
	const markAsRead = await notification.update({ is_read: true })
	res.status(200).json({ message: 'Marked notification as read.' })
})

notificationRouter.put('/mark-all-read', async (req, res, next) => {
	const markAllRead = await Notification.update(
		{
			is_read: true,
		},
		{
			where: { is_read: false },
		}
	)
	res.status(200).json({ message: 'All notifications marked as read.' })
})

module.exports = notificationRouter
