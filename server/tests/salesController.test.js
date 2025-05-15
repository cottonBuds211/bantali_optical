const request = require('supertest')
const express = require('express')
const db = require('../models')
const salesRouter = require('../controllers/salesController')

jest.mock('../models')
const app = express()
app.use(express.json())
app.use('/sales', salesRouter)

describe('Sales Router', () => {
	beforeAll(() => {
		process.env.NODE_ENV = 'test'
	})

	afterAll(() => {
		process.env.NODE_ENV = 'development'
	})

	describe('GET /sales', () => {
		it('should return all sales', async () => {
			const mockSales = [
				{ sale_id: 1, frame_id: 1, quantity: 2, total: 200 },
				{ sale_id: 2, frame_id: 2, quantity: 1, total: 100 },
			]

			db.Sales.findAll.mockResolvedValue(mockSales)

			const res = await request(app).get('/sales')

			expect(res.statusCode).toBe(200)
			expect(res.body).toEqual(mockSales)
		})
	})

	describe('POST /sales', () => {
		it('should create a sale and update inventory if stock is sufficient', async () => {
			const newSale = { frame_id: 1, quantity: 2, total: 200 }
			const mockInventoryItem = { frame_id: 1, stockQuantity: 5 }
			const mockSale = { sale_id: 1, ...newSale }

			db.Frame.findOne.mockResolvedValue(mockInventoryItem)
			db.Sales.create.mockResolvedValue(mockSale)
			db.Frame.update.mockResolvedValue([
				{ frame_id: 1, stockQuantity: 3 },
			])

			const res = await request(app).post('/sales').send(newSale)

			expect(res.statusCode).toBe(201)
			expect(res.body).toEqual(mockSale)
		})

		it('should return 404 if the inventory item is not found', async () => {
			const newSale = { frame_id: 999, quantity: 1, total: 100 }

			db.Frame.findOne.mockResolvedValue(null)

			const res = await request(app).post('/sales').send(newSale)

			expect(res.statusCode).toBe(404)
			expect(res.body).toEqual({ error: 'Item not found in inventory' })
		})

		it('should return 400 if stock is insufficient', async () => {
			const newSale = { frame_id: 1, quantity: 10, total: 100 }
			const mockInventoryItem = { frame_id: 1, stockQuantity: 5 }

			db.Frame.findOne.mockResolvedValue(mockInventoryItem)

			const res = await request(app).post('/sales').send(newSale)

			expect(res.statusCode).toBe(400)
			expect(res.body).toEqual({ error: 'Not enough stock available' })
		})
	})
})
