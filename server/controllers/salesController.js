const salesRouter = require('express').Router()
const db = require('../models')
const { Sales, Inventory, sequelize } = db

salesRouter.get('/', async (req, res, next) => {
	const sales = await Sales.findAll({})
	res.json(sales)
})

salesRouter.post('/', async (req, res, next) => {
	const newSale = req.body
	console.log('itemID', newSale.item_id)
	const inventoryItem = await Inventory.findOne({
		where: { item_id: newSale.item_id },
	})

	if (!inventoryItem) {
		return res.status(404).json({ error: 'Item not found in inventory' })
	}
	if (inventoryItem.stockQuantity < newSale.quantity) {
		return res.status(400).json({ error: 'Not enough stock available' })
	}

	const sale = await Sales.create(newSale)

	const item = await Inventory.update(
		{
			stockQuantity: inventoryItem.stockQuantity - newSale.quantity,
		},
		{ where: { item_id: newSale.item_id } }
	)

	res.status(201).json(sale)
})

module.exports = salesRouter
