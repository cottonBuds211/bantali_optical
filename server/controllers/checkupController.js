const checkupRouter = require('express').Router()
const db = require('../models')
const { CheckUpDetail } = db

checkupRouter.get('/:visitId', async (req, res, next) => {
	const checkUp = await CheckUpDetail.findOne({
		where: { visitation_id: req.params.visitId },
	})
	if (!checkUp) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		res.json(checkUp)
	}
})

checkupRouter.post('/', async (req, res, next) => {
	const newCheckUp = req.body
	const checkUp = await CheckUpDetail.create({
		...newCheckUp,
	})
	res.status(201).json(checkUp)
})

module.exports = checkupRouter
