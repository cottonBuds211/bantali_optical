const visitationRouter = require('express').Router()
const db = require('../models')
const { Visitation } = db

visitationRouter.get('/', async (req, res, next) => {
	const visitations = await Visitation.findAll({
		where: { patient_id: 1 },
	})
	res.json(visitations)
})

visitationRouter.get('/:id', async (req, res, next) => {
	const visitation = await Visitation.findByPk(req.params.id)
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
	res.status(201).json(visitation)
})

module.exports = visitationRouter
