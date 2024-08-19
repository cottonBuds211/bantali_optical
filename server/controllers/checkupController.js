const checkupRouter = require('express').Router()
const db = require('../models')
const { CheckUpDetail } = db

checkupRouter.get('/', async (req, res, next) => {
	const checkUps = await CheckUpDetail.findAll({
		where: { visitation_id: 1 },
	})
	res.json(checkUps)
})

checkupRouter.get('/:id', async (req, res, next) => {
	const checkUp = await CheckUpDetail.findByPk(req.params.id)
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
	res.status(401).json(checkUp)
})

module.exports = checkupRouter
