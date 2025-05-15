const request = require('supertest')
const express = require('express')
const db = require('../models')
const visitationRouter = require('../controllers/visitationController')

jest.mock('../models')
const app = express()
app.use(express.json())
app.use('/visitations', visitationRouter)

describe('Visitation Router', () => {
	beforeAll(() => {
		// Set environment to 'test' to bypass authentication
		process.env.NODE_ENV = 'test'
	})

	afterAll(() => {
		process.env.NODE_ENV = 'development' // Reset environment
	})

	describe('GET /visitations/:patientId', () => {
		it('should return all visitations for a specific patient', async () => {
			const mockVisitations = [
				{ visitation_id: 1, patient_id: 1, notes: 'Checkup' },
				{ visitation_id: 2, patient_id: 1, notes: 'Follow-up' },
			]

			db.Visitation.findAll.mockResolvedValue(mockVisitations)

			const res = await request(app).get('/visitations/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockVisitations)
		})
	})

	describe('GET /visitations', () => {
		it('should return all visitations', async () => {
			const mockVisitations = [
				{ visitation_id: 1, patient_id: 1, notes: 'Checkup' },
				{ visitation_id: 2, patient_id: 2, notes: 'Follow-up' },
			]

			db.Visitation.findAll.mockResolvedValue(mockVisitations)

			const res = await request(app).get('/visitations')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockVisitations)
		})
	})

	describe('GET /visitations/:patientId/:visitId', () => {
		it('should return a specific visitation by patient and visitation ID', async () => {
			const mockVisitation = {
				visitation_id: 1,
				patient_id: 1,
				notes: 'Checkup',
			}

			db.Visitation.findOne.mockResolvedValue(mockVisitation)

			const res = await request(app).get('/visitations/1/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockVisitation)
		})

		it('should return 404 if visitation is not found', async () => {
			db.Visitation.findOne.mockResolvedValue(null)

			const res = await request(app).get('/visitations/1/999')

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ error: 'Not found' })
		})
	})

	describe('POST /visitations', () => {
		it('should create a new visitation', async () => {
			const newVisit = { patient_id: 1, notes: 'New visit' }
			const mockVisitation = { visitation_id: 3, ...newVisit }

			db.Visitation.create.mockResolvedValue(mockVisitation)

			const res = await request(app).post('/visitations').send(newVisit)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual(mockVisitation)
		})
	})

	describe('DELETE /visitations/:visit_id', () => {
		it('should delete a visitation by ID', async () => {
			const mockVisitation = { visitation_id: 1, destroy: jest.fn() }

			db.Visitation.findByPk.mockResolvedValue(mockVisitation)

			const res = await request(app).delete('/visitations/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual({ message: 'Visit deleted successfully' })
			expect(mockVisitation.destroy).toHaveBeenCalled()
		})

		it('should return 404 if visitation is not found', async () => {
			db.Visitation.findByPk.mockResolvedValue(null)

			const res = await request(app).delete('/visitations/999')

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ error: 'Visit not found' })
		})
	})
})
