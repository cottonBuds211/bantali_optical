// tests/appointmentRouter.test.js

const request = require('supertest')
const express = require('express')
const appointmentRouter = require('../controllers/appointmentController')
const db = require('../models')

// Mock the database models
jest.mock('../models')

// Create an Express app and apply the router
const app = express()
app.use(express.json())
app.use('/appointments', appointmentRouter)

describe('Appointment Router', () => {
	beforeAll(() => {
		// Set environment to 'test' to bypass authentication
		process.env.NODE_ENV = 'test'
	})

	afterAll(() => {
		process.env.NODE_ENV = 'development' // Reset environment
	})

	describe('GET /appointments/unavailable-slot', () => {
		it('should return an array of unavailable appointment times for a specific date', async () => {
			const mockAppointments = [
				{ appointment_time_start: new Date('2024-11-01T10:00:00Z') },
				{ appointment_time_start: new Date('2024-11-01T11:00:00Z') },
			]

			db.Appointment.findAll.mockResolvedValue(mockAppointments)

			const res = await request(app)
				.get('/appointments/unavailable-slot')
				.query({ date: '2024-11-01' })

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual([
				'2024-11-01T10:00:00.000Z',
				'2024-11-01T11:00:00.000Z',
			])
		})
	})

	describe('GET /appointments/booked', () => {
		it('should return an array of accepted appointments', async () => {
			const mockAppointments = [
				{ appointment_id: 1, status: 'Accepted' },
				{ appointment_id: 2, status: 'Accepted' },
			]

			db.Appointment.findAll.mockResolvedValue(mockAppointments)

			const res = await request(app).get('/appointments/booked')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockAppointments)
		})
	})

	describe('GET /appointments/pending', () => {
		it('should return an array of pending appointments', async () => {
			const mockAppointments = [
				{ appointment_id: 1, status: 'Pending' },
				{ appointment_id: 2, status: 'Pending' },
			]

			db.Appointment.findAll.mockResolvedValue(mockAppointments)

			const res = await request(app).get('/appointments/pending')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockAppointments)
		})
	})

	describe('GET /appointments/history', () => {
		it('should return an array of completed, rejected, and cancelled appointments', async () => {
			const mockAppointments = [
				{ appointment_id: 1, status: 'Completed' },
				{ appointment_id: 2, status: 'Rejected' },
			]

			db.Appointment.findAll.mockResolvedValue(mockAppointments)

			const res = await request(app).get('/appointments/history')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockAppointments)
		})
	})

	describe('POST /appointments', () => {
		it('should create a new appointment and return it', async () => {
			const mockAppointmentData = {
				appointment_time_start: '2024-11-01T10:00:00Z',
			}
			const mockCreatedAppointment = {
				...mockAppointmentData,
				appointment_id: 1,
				appointment_time_end: '2024-11-01T11:00:00Z',
			}

			db.Appointment.create.mockResolvedValue(mockCreatedAppointment)

			const res = await request(app)
				.post('/appointments')
				.send(mockAppointmentData)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual(mockCreatedAppointment)
		})
	})

	describe('PUT /appointments/accept/:id', () => {
		it('should update appointment status to Accepted', async () => {
			const mockAppointment = { appointment_id: 1, update: jest.fn() }
			mockAppointment.update.mockResolvedValue({
				appointment_id: 1,
				status: 'Accepted',
			})

			db.Appointment.findByPk.mockResolvedValue(mockAppointment)

			const res = await request(app).put('/appointments/accept/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual({ appointment_id: 1, status: 'Accepted' })
		})
	})

	describe('PUT /appointments/reject/:id', () => {
		it('should update appointment status to Rejected', async () => {
			const mockAppointment = { appointment_id: 1, update: jest.fn() }
			mockAppointment.update.mockResolvedValue({
				appointment_id: 1,
				status: 'Rejected',
			})

			db.Appointment.findByPk.mockResolvedValue(mockAppointment)

			const res = await request(app).put('/appointments/reject/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual({ appointment_id: 1, status: 'Rejected' })
		})
	})

	describe('PUT /appointments/archive/:id', () => {
		it('should mark the appointment as archived', async () => {
			const mockAppointment = { appointment_id: 1, update: jest.fn() }
			mockAppointment.update.mockResolvedValue({
				appointment_id: 1,
				isArchived: true,
			})

			db.Appointment.findByPk.mockResolvedValue(mockAppointment)

			const res = await request(app).put('/appointments/archive/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual({ appointment_id: 1, isArchived: true })
		})
	})
})
