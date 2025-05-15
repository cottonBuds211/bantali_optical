const appointmentRouter = require('express').Router()
const db = require('../models')
const { Appointment, Notification, Log } = db
const { Op } = require('sequelize')
const verifyToken = require('../middleware/authMiddleware')
const { sendNotificationEmail } = require('../utils/mailer')

// Custom middleware that conditionally applies `verifyToken`
const conditionalVerifyToken = (req, res, next) => {
	if (process.env.NODE_ENV === 'test') {
		// Skip authentication in test mode
		return next()
	}
	verifyToken(req, res, next)
}

appointmentRouter.get('/unavailable-slot', async (req, res, next) => {
	const { date } = req.query
	const startOfDay = new Date(date)
	const endOfDay = new Date(date)
	endOfDay.setHours(23, 59, 59, 999)

	const unavailableAppointments = await Appointment.findAll({
		where: {
			appointment_time_start: {
				[Op.between]: [startOfDay, endOfDay],
			},
			status: { [Op.or]: ['Accepted', 'Pending'] },
		},
	})

	const unavailableTimes = unavailableAppointments.map(appointment =>
		appointment.appointment_time_start.toISOString()
	)
	res.json(unavailableTimes)
})

// Use `conditionalVerifyToken` instead of `verifyToken` for protected routes
appointmentRouter.get(
	'/accepted',
	conditionalVerifyToken,
	async (req, res, next) => {
		const appointments = await Appointment.findAll({
			where: { status: 'Accepted' },
		})
		res.status(200).json(appointments)
	}
)

appointmentRouter.get(
	'/pending',
	conditionalVerifyToken,
	async (req, res, next) => {
		const appointments = await Appointment.findAll({
			where: { status: 'Pending' },
		})
		res.status(200).json(appointments)
	}
)

appointmentRouter.get(
	'/rejected',
	conditionalVerifyToken,
	async (req, res, next) => {
		const appointments = await Appointment.findAll({
			where: { status: 'Rejected' },
		})

		res.status(200).json(appointments)
	}
)

appointmentRouter.get(
	'/history',
	conditionalVerifyToken,
	async (req, res, next) => {
		try {
			const appointments = await Appointment.findAll({
				where: {
					[Op.and]: [
						{
							[Op.or]: [
								{ status: 'Completed' },
								{ status: 'Cancelled' },
								{ status: 'Missed' },
							],
						},
						{ isArchived: false },
					],
				},
				order: [['appointment_time_start', 'ASC']],
			})
			res.status(200).json(appointments)
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
)

appointmentRouter.get(
	'/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const appointment = await Appointment.findByPk(id)
		res.status(200).json(appointment)
	}
)

appointmentRouter.put(
	'/accept/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const user_id = req.body.user_id
		console.log('body', req.body)
		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			status: 'Accepted',
		})
		await sendNotificationEmail(appointment)
		if (updatedAppointment) {
			const log = await Log.create({
				reference_id: updatedAppointment.appointment_id,
				action: 'EDIT',
				action_date: new Date(),
				details: 'Accepted an appointment request',
				user_id: user_id,
			})
		}

		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.put(
	'/reject/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const user_id = req.body.user_id
		const reason_for_rejection = req.body.reason_for_rejection
		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			status: 'Rejected',
			reason_for_rejection: reason_for_rejection,
		})
		try {
			const log = await Log.create({
				reference_id: appointment.appointment_id,
				action: 'EDIT',
				action_date: new Date(),
				details: 'Rejected an appointment request',
				user_id: user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.put(
	'/mark-as-complete/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const user_id = req.body.user_id

		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			status: 'Completed',
		})
		try {
			const log = await Log.create({
				reference_id: appointment.appointment_id,
				action: 'EDIT',
				action_date: new Date(),
				details: 'Maked an appointment request as completed',
				user_id: user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.put(
	'/archive/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const user_id = req.body.user_id

		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			isArchived: true,
		})
		try {
			const log = await Log.create({
				reference_id: appointment.appointment_id,
				action: 'EDIT',
				action_date: new Date(),
				details: 'Archived an appointment',
				user_id: user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.post('/', async (req, res, next) => {
	const data = req.body
	const appointment_time_end = new Date(req.body.appointment_time_start)
	appointment_time_end.setHours(appointment_time_end.getHours() + 1)

	const newAppointment = await Appointment.create({
		...data,
		appointment_time_end,
	})

	const notificationData = {
		type: 'new_request',
		message: 'New appointment request',
		appointment_id: newAppointment.appointment_id,
	}
	const newNotification = await Notification.create(notificationData)

	if (req.io && req.adminSocket) {
		req.io
			.to(req.adminSocket)
			.emit('appointment-notification', newNotification)
	}

	if (newAppointment) {
		res.status(201).json(newAppointment)
	} else {
		res.status(400).json({ error: 'Failed to create appointment' })
	}
})

appointmentRouter.put(
	'/mark-as-pending/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const user_id = req.body.user_id

		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			status: 'Pending',
		})
		try {
			const log = await Log.create({
				reference_id: appointment.appointment_id,
				action: 'EDIT',
				action_date: new Date(),
				details: 'Restored an appointment',
				user_id: user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.put(
	'/mark-as-cancelled/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id
		const user_id = req.body.user_id

		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			status: 'Cancelled',
		})
		try {
			const log = await Log.create({
				reference_id: appointment.appointment_id,
				action: 'EDIT',
				action_date: new Date(),
				details: 'Cancelled an appointment',
				user_id: user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.put(
	'/mark-as-missed/:id',
	conditionalVerifyToken,
	async (req, res, next) => {
		const id = req.params.id

		const appointment = await Appointment.findByPk(id)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}
		const updatedAppointment = await appointment.update({
			status: 'Missed',
		})

		res.status(200).json(updatedAppointment)
	}
)

appointmentRouter.put(
	'/:appointmentId',
	conditionalVerifyToken,
	async (req, res, next) => {
		const data = req.body
		const appointmentId = req.params.appointmentId

		const appointment = await Appointment.findByPk(appointmentId)
		if (!appointment) {
			res.status(404).json({ message: 'Appointment not found' })
		}

		const appointment_time_end = new Date(req.body.appointment_time_start)
		appointment_time_end.setHours(appointment_time_end.getHours() + 1)

		const updatedAppointment = await appointment.update({
			...data,
			appointment_time_end,
		})

		if (updatedAppointment) {
			res.status(201).json(updatedAppointment)
			try {
				const log = await Log.create({
					reference_id: appointment.appointment_id,
					action: 'EDIT',
					action_date: new Date(),
					details: 'Rescheduled an appointment',
					user_id: appointment.user_id,
				})
				console.log(log)
			} catch (err) {
				console.log(err)
			}
		} else {
			res.status(400).json({ error: 'Failed to edit appointment' })
		}
	}
)

module.exports = appointmentRouter
