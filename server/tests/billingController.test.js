const request = require('supertest')
const express = require('express')
const db = require('../models')
const billingRouter = require('../controllers/billingController')

jest.mock('../models')
const app = express()
app.use(express.json())
app.use('/billings', billingRouter)

describe('Billing Router', () => {
	beforeAll(() => {
		process.env.NODE_ENV = 'test'
	})

	afterAll(() => {
		process.env.NODE_ENV = 'development'
	})

	describe('GET /billings/:patientId', () => {
		it('should return all billings for a specific patient', async () => {
			const mockBillings = [
				{
					billing_id: 'BILL001',
					patient_id: 1,
					service_fee: 100.0,
					lense_fee: 50.0,
					discount: 10.0,
					total_amount: 140.0,
					lineItems: [{ item: 'Frame', cost: 40.0 }],
				},
				{
					billing_id: 'BILL002',
					patient_id: 1,
					service_fee: 150.0,
					lense_fee: 75.0,
					discount: 20.0,
					total_amount: 205.0,
					lineItems: [{ item: 'Sunglasses', cost: 50.0 }],
				},
			]

			db.Billing.findAll.mockResolvedValue(mockBillings)

			const res = await request(app).get('/billings/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockBillings)
		})
	})

	describe('GET /billings', () => {
		it('should return all billings', async () => {
			const mockBillings = [
				{
					billing_id: 'BILL001',
					patient_id: 1,
					service_fee: 100.0,
					lense_fee: 50.0,
					discount: 10.0,
					total_amount: 140.0,
					lineItems: [{ item: 'Frame', cost: 40.0 }],
				},
				{
					billing_id: 'BILL002',
					patient_id: 2,
					service_fee: 150.0,
					lense_fee: 75.0,
					discount: 20.0,
					total_amount: 205.0,
					lineItems: [{ item: 'Sunglasses', cost: 50.0 }],
				},
			]

			db.Billing.findAll.mockResolvedValue(mockBillings)

			const res = await request(app).get('/billings')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockBillings)
		})
	})

	describe('GET /billings/:patientId/:visitId', () => {
		it('should return a specific billing by patient and visitation ID', async () => {
			const mockBilling = {
				billing_id: 'BILL001',
				patient_id: 1,
				visitation_id: 2,
				service_fee: 100.0,
				lense_fee: 50.0,
				discount: 10.0,
				total_amount: 140.0,
				lineItems: [{ item: 'Frame', cost: 40.0 }],
			}

			db.Billing.findOne.mockResolvedValue(mockBilling)

			const res = await request(app).get('/billings/1/2')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockBilling)
		})

		it('should return 404 if billing is not found', async () => {
			db.Billing.findOne.mockResolvedValue(null)

			const res = await request(app).get('/billings/1/999')

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ error: 'Not found' })
		})
	})

	describe('POST /billings', () => {
		it('should create a new billing', async () => {
			const newBilling = {
				billing_id: 'BILL004',
				patient_id: 1,
				service_fee: 200.0,
				lense_fee: 100.0,
				discount: 15.0,
				total_amount: 285.0,
				lineItems: [{ item: 'Progressive Lenses', cost: 100.0 }],
			}
			const mockBilling = { ...newBilling }

			db.Billing.create.mockResolvedValue(mockBilling)

			const res = await request(app).post('/billings').send(newBilling)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual(mockBilling)
		})
	})
})
