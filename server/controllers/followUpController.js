const followUpRouter = require('express').Router()
const db = require('../models')
const { FollowUpDetail } = db

followUpRouter.get('/:visitId', async (req, res, next) => {
	const followUp = await FollowUpDetail.findOne({
		where: { visitation_id: req.params.visitId },
	})
	if (!followUp) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		res.json(followUp)
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
