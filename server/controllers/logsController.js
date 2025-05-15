const logRouter = require('express').Router()
const db = require('../models')
const { Log } = db

logRouter.get('/', async (req, res, next) => {
	const logs = await Log.findAll({})
	res.json(logs)
})

module.exports = logRouter
