// tests/patientRouter.test.js

const request = require('supertest')
const express = require('express')
const patientRouter = require('../controllers/patientController')
const db = require('../models')

// Mock the database models
jest.mock('../models')

// Create an Express app and apply the router
const app = express()
app.use(express.json())
app.use('/patients', patientRouter)

describe('Patient Router', () => {
	describe('GET /patients', () => {
		it('should return an array of active patients', async () => {
			const mockPatients = [
				{ patient_id: 1, name: 'John Doe', active: true },
				{ patient_id: 2, name: 'Jane Smith', active: true },
			]

			db.Patient.findAll.mockResolvedValue(mockPatients)

			const res = await request(app).get('/patients')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockPatients)
		})
	})

	describe('GET /patients/profile/:id', () => {
		it('should return a patient by ID if found', async () => {
			const mockPatient = {
				patient_id: 1,
				name: 'John Doe',
				active: true,
			}

			db.Patient.findByPk.mockResolvedValue(mockPatient)

			const res = await request(app).get('/patients/profile/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockPatient)
		})

		it('should return a 404 status if patient is not found', async () => {
			db.Patient.findByPk.mockResolvedValue(null)

			const res = await request(app).get('/patients/profile/999')

			expect(res.statusCode).toBe(404)
		})
	})

	describe('POST /patients', () => {
		it('should create a new patient and return it', async () => {
			const newPatientData = { name: 'John Doe', age: 30, active: true }
			const createdPatient = { patient_id: 1, ...newPatientData }

			db.Patient.create.mockResolvedValue(createdPatient)

			const res = await request(app)
				.post('/patients')
				.send(newPatientData)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual(createdPatient)
		})

		it('should return a 400 status if creation fails', async () => {
			db.Patient.create.mockResolvedValue(null)

			const res = await request(app)
				.post('/patients')
				.send({ name: 'John Doe' })

			expect(res.statusCode).toBe(400)
			expect(res.body).toEqual({ error: 'Failed to insert patient' })
		})
	})

	describe('PUT /patients/profile/:id', () => {
		it('should update an existing patient by ID and return updated data', async () => {
			const updatedPatientData = { name: 'John Doe Updated', age: 31 }
			const existingPatient = {
				patient_id: 1,
				name: 'John Doe',
				age: 30,
				update: jest.fn(),
			}

			existingPatient.update.mockResolvedValue({
				patient_id: 1,
				...updatedPatientData,
			})
			db.Patient.findByPk.mockResolvedValue(existingPatient)

			const res = await request(app)
				.put('/patients/profile/1')
				.send(updatedPatientData)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual({
				patient_id: 1,
				...updatedPatientData,
			})
		})

		it('should return a 404 status if patient is not found', async () => {
			db.Patient.findByPk.mockResolvedValue(null)

			const res = await request(app)
				.put('/patients/profile/999')
				.send({ name: 'Nonexistent Patient' })

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ message: 'patient not found' })
		})
	})
})
