const request = require('supertest')
const express = require('express')
const db = require('../models')
const frameRouter = require('../controllers/frameController')

jest.mock('../models')
const app = express()
app.use(express.json())
app.use('/frames', frameRouter)

describe('Frame Router', () => {
	beforeAll(() => {
		process.env.NODE_ENV = 'test'
	})

	afterAll(() => {
		process.env.NODE_ENV = 'development'
	})

	describe('GET /frames', () => {
		it('should return all frames', async () => {
			const mockFrames = [
				{ frame_id: 1, name: 'Frame A', price: 100 },
				{ frame_id: 2, name: 'Frame B', price: 150 },
			]

			db.Frame.findAll.mockResolvedValue(mockFrames)

			const res = await request(app).get('/frames')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockFrames)
		})
	})

	describe('GET /frames/:frame_id', () => {
		it('should return a specific frame by ID', async () => {
			const mockFrame = { frame_id: 1, name: 'Frame A', price: 100 }

			db.Frame.findByPk.mockResolvedValue(mockFrame)

			const res = await request(app).get('/frames/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockFrame)
		})

		it('should return 404 if frame is not found', async () => {
			db.Frame.findByPk.mockResolvedValue(null)

			const res = await request(app).get('/frames/999')

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ error: 'Frame not found' })
		})
	})

	describe('POST /frames', () => {
		it('should create a new frame', async () => {
			const newFrame = { name: 'Frame C', price: 120 }
			const mockFrame = { frame_id: 3, ...newFrame, imageUrl: null }

			db.Frame.create.mockResolvedValue(mockFrame)

			const res = await request(app).post('/frames').send(newFrame)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual(mockFrame)
		})
	})

	describe('PUT /frames/:frame_id', () => {
		it('should update an existing frame by ID', async () => {
			const existingFrame = {
				frame_id: 1,
				name: 'Frame A',
				price: 100,
				update: jest.fn(),
			}
			const updatedData = { name: 'Frame A Updated', price: 110 }

			existingFrame.update.mockResolvedValue({
				frame_id: 1,
				...updatedData,
			})

			db.Frame.findByPk.mockResolvedValue(existingFrame)

			const res = await request(app).put('/frames/1').send(updatedData)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual({ frame_id: 1, ...updatedData })
		})

		it('should return 404 if frame is not found', async () => {
			db.Frame.findByPk.mockResolvedValue(null)

			const res = await request(app)
				.put('/frames/999')
				.send({ name: 'Frame D' })

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ message: 'Frame not found' })
		})
	})

	describe('DELETE /frames/:frame_id', () => {
		it('should delete a frame by ID', async () => {
			const mockFrame = { frame_id: 1, destroy: jest.fn() }

			db.Frame.findByPk.mockResolvedValue(mockFrame)

			const res = await request(app).delete('/frames/1')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual({ message: 'Frame deleted successfully' })
			expect(mockFrame.destroy).toHaveBeenCalled()
		})

		it('should return 404 if frame is not found', async () => {
			db.Frame.findByPk.mockResolvedValue(null)

			const res = await request(app).delete('/frames/999')

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ error: 'Frame not found' })
		})
	})
})
