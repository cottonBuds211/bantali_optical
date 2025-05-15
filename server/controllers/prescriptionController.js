const prescriptionRouter = require('express').Router()
const db = require('../models')
const { Prescription } = db

prescriptionRouter.get('/:patientId', async (req, res, next) => {
	const prescriptions = await Prescription.findAll({
		where: { patient_id: req.params.patientId },
	})
	res.json(prescriptions)
})

prescriptionRouter.get(
	'/:patientId/:prescriptionId',
	async (req, res, next) => {
		const prescription = await Prescription.findOne({
			where: {
				patient_id: req.params.patientId,
				prescription_id: req.params.prescriptionId,
			},
		})
		if (!prescription) {
			res.status(404).json({ error: 'prescription not found' }).end()
		} else {
			res.json(prescription)
		}
	}
)

prescriptionRouter.post('/', async (req, res, next) => {
	const newPrescription = req.body
	console.log(newPrescription)
	const prescription = await Prescription.create({
		...newPrescription,
	})
	res.status(201).json(prescription)
})

module.exports = prescriptionRouter
