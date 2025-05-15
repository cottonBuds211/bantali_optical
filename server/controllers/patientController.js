const patientRouter = require('express').Router()
const { where } = require('sequelize')
const db = require('../models')
const { Patient, Log } = db

//Get all data
patientRouter.get('/', async (req, res, next) => {
	const patients = await Patient.findAll({ where: { active: true } })
	res.json(patients)
})

patientRouter.get('/archived', async (req, res, next) => {
	const patients = await Patient.findAll({ where: { active: false } })
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

//patient match
patientRouter.get('/check-for-match', async (req, res, next) => {
	console.log('body', req.query)
	const { first_name, last_name } = req.query
	const patient = await Patient.findOne({
		where: { first_name: first_name, last_name: last_name },
	})
	if (patient) {
		res.json(patient)
	} else {
		res.status(404).json({ message: 'Patient not found!' })
	}
})

patientRouter.post('/', async (req, res, next) => {
	const newData = req.body

	const data = await Patient.create({
		...newData,
		active: true,
	})
	if (data) {
		try {
			const log = await Log.create({
				reference_id: data.patient_id,
				action: 'CREATE',
				action_date: new Date(),
				details: 'Added a new patient',
				user_id: data.user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(201).json(data)
	} else {
		res.status(400).json({ error: 'Failed to insert patient' })
	}
})

patientRouter.put('/profile/:id', async (req, res, next) => {
	const id = req.params.id
	const updatedData = req.body
	const patient = await Patient.findByPk(id)
	//  console.log(patient)
	if (!patient) {
		return res.status(404).json({ message: `patient not found` })
	}
	//console.log(updatedData)
	const data = await patient.update(updatedData)
	try {
		const log = await Log.create({
			reference_id: data.patient_id,
			action: 'EDIT',
			action_date: new Date(),
			details: 'Updated patient info',
			user_id: data.user_id,
		})
		console.log(log)
	} catch (err) {
		console.log(err)
	}
	res.status(201).json(data)
})
patientRouter.put('/archive/:id', async (req, res, next) => {
	const id = req.params.id
	const { userId } = req.body
	const patient = await Patient.findByPk(id)
	if (!patient) {
		res.status(404).json({ message: 'Patient not found' })
	}
	const updatedPatient = await patient.update({
		active: false,
	})
	try {
		const log = await Log.create({
			reference_id: updatedPatient.patient_id,
			action: 'EDIT',
			action_date: new Date(),
			details: 'Archived a patient',
			user_id: userId,
		})
		console.log(log)
	} catch (err) {
		console.log(err)
	}
	res.status(200).json(updatedPatient)
})

patientRouter.delete('/delete/:id/:userId', async (req, res, next) => {
	const id = req.params.id
	const userId = req.params.userId
	console.log(userId)
	try {
		const patient = await Patient.findByPk(id)

		if (!patient) {
			// If user doesn't exist, send a 404 response
			return res.status(404).json({ error: 'Patient not found' })
		}

		await patient.destroy()
		try {
			const log = await Log.create({
				reference_id: patient.patient_id,
				action: 'DELETE',
				action_date: new Date(),
				details: 'Deleted a patient',
				user_id: userId,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json({ message: 'Patient deleted successfully' })
	} catch (error) {
		// Handle any errors during the process
		console.error('Error deleting patient:', error)
		res.status(500).json({ error: 'Failed to delete patient' })
	}
})

module.exports = patientRouter
