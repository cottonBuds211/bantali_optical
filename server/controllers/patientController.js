const patientRouter = require('express').Router()
const db = require('../models')
const { Patient } = db

//Get all data
patientRouter.get('/', async (req, res, next) => {
	const patients = await Patient.findAll({ where: { active: true } })
	res.json(patients)
})

//Get patient by ID
patientRouter.get('/profile/:id', async (req, res, next) => {
	const id = req.params.id

	const patient = await Patient.findByPk(id)
	if (patient) {
		res.json(patient)
	} else {
		res.status(404).end()
	}
})

patientRouter.post('/', async (req, res, next) => {
	const newData = req.body

	const data = await Patient.create({
		...newData,
		active: true,
	})
	if (data) {
		res.status(201).json(data)
	} else {
		res.status(400).json({ error: 'Failed to insert patient' })
	}
})

patientRouter.put('/profile/:id', async (req, res, next) => {
	const id = req.params.id
	const updatedData = req.body

	const patient = await Patient.findByPk(id)
	console.log(patient)
	if (!patient) {
		res.status(404).json({ message: `patient not found` })
	}

	const data = await patient.update(updatedData)
	res.status(201).json(data)
})

module.exports = patientRouter
