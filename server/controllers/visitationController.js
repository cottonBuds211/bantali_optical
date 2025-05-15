const visitationRouter = require('express').Router()
const db = require('../models')
const { Visitation, Log } = db

visitationRouter.get('/:patientId', async (req, res, next) => {
	const visitations = await Visitation.findAll({
		where: { patient_id: req.params.patientId },
	})
	res.json(visitations)
})

visitationRouter.get('/', async (req, res, next) => {
	const visitations = await Visitation.findAll({})
	res.json(visitations)
})

visitationRouter.get('/:patientId/:visitId', async (req, res, next) => {
	const visitation = await Visitation.findOne({
		where: {
			patient_id: req.params.patientId,
			visitation_id: req.params.visitId,
		},
	})

	if (!visitation) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		res.json(visitation)
	}
})

visitationRouter.post('/', async (req, res, next) => {
	const newVisit = req.body

	const visitation = await Visitation.create({
		...newVisit,
	})
	try {
		const log = await Log.create({
			reference_id: visitation.visitation_id,
			action: 'CREATE',
			action_date: new Date(),
			details: 'Completed a consultation',
			user_id: visitation.user_id,
		})
		console.log(log)
	} catch (err) {
		console.log(err)
	}
	res.status(201).json(visitation)
})
visitationRouter.delete('/:visit_id/:userId', async (req, res, next) => {
	const visitId = req.params.visit_id

	try {
		const visit = await Visitation.findByPk(visitId)

		if (!visit) {
			// If user doesn't exist, send a 404 response
			return res.status(404).json({ error: 'Visit not found' })
		}

		await visit.destroy()
		try {
			const log = await Log.create({
				reference_id: visit.visitation_id,
				action: 'DELETE',
				action_date: new Date(),
				details: 'Deleted a visitation',
				user_id: req.params.userId,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json({ message: 'Visit deleted successfully' })
	} catch (error) {
		// Handle any errors during the process
		console.error('Error deleting user:', error)
		res.status(500).json({ error: 'Failed to delete visit' })
	}
})

module.exports = visitationRouter
