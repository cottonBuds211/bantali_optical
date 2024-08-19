const prescriptionRouter = require('express').Router()
const db = require('../models')
const { Prescription } = db

prescriptionRouter.get('/', async (req, res, next) => {
	const prescriptions = await Prescription.findAll({
		where: { check_up_id: 1 },
	})
	res.json(prescriptions)
})

prescriptionRouter.get('/:id', async (req, res, next) => {
	const prescription = await Prescription.findByPk(req.params.id)
	if (!prescription) {
		res.status(404).json({ error: 'prescription not found' }).end()
	} else {
		res.json(prescription)
	}
})

prescriptionRouter.post('/', async (req, res, next) => {
	const newPrescription = req.body
	const prescription = await Prescription.create({
		newPrescription,
	})
	res.status(201).json(prescription)
})

module.exports = prescriptionRouter
