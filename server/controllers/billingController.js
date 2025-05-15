const billingRouter = require('express').Router()
const db = require('../models')
const { Billing, Log } = db

//for one patient
billingRouter.get('/:patientId', async (req, res, next) => {
	const billings = await Billing.findAll({
		where: { patient_id: req.params.patientId },
	})
	res.json(billings)
})
billingRouter.get('/billing/:billing_id', async (req, res, next) => {
	const billing = await Billing.findOne({
		where: { billing_id: req.params.billing_id },
	})
	if (!billing) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		res.json(billing)
	}
})
//get All
billingRouter.get('/', async (req, res, next) => {
	const billings = await Billing.findAll({})
	res.json(billings)
})

billingRouter.get('/:patientId/:visitId', async (req, res, next) => {
	const billing = await Billing.findOne({
		where: {
			patient_id: req.params.patientId,
			visitation_id: req.params.visitId,
		},
	})

	if (!billing) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		res.json(billing)
	}
})

billingRouter.put('/mark-as-paid/:billing_id', async (req, res, next) => {
	const billing = await Billing.findOne({
		where: {
			billing_id: req.params.billing_id,
		},
	})
	if (!billing) {
		res.status(404).json({ error: 'Not found' }).end()
	} else {
		await billing.update({
			status: 'Paid',
			initialPayment:
				parseFloat(billing.total_amount) + parseFloat(billing.discount),
			finalPaymentDate: new Date(),
		})
		const log = await Log.create({
			reference_id: billing.billing_id,
			action: 'EDIT',
			action_date: new Date(),
			details: 'Updated patient info',
			user_id: req.body.user_id,
		})
		res.json(billing)
	}
})

//adding a billing
billingRouter.post('/', async (req, res, next) => {
	const newBilling = req.body

	try {
		const billing = await Billing.create({
			...newBilling,
		})

		res.status(201).json(billing)
	} catch (error) {
		console.log(error)
	}
})

module.exports = billingRouter
