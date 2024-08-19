const followUpRouter = require('express').Router()
const db = require('../models')
const { FollowUpDetail } = db

followUpRouter.get('/', async (req, res, next) => {
	const followUps = await FollowUpDetail.findAll({
		where: { visitation_id: 1 },
	})
	res.json(followUps)
})

followUpRouter.get('/:id', async (req, res, next) => {
	const follwUp = await FollowUpDetail.findByPk(req.params.id)
	if (!follwUp) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		res.json(follwUp)
	}
})

followUpRouter.post('/', async (req, res, next) => {
	const newFollowUp = req.body
	const followUp = await FollowUpDetail.create({
		...newFollowUp,
	})
	res.status(201).json(followUp)
})

module.exports = followUpRouter
