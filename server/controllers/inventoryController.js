const inventoryRouter = require('express').Router()
const db = require('../models')
const path = require('path')
const { Inventory, Log } = db
const multer = require('multer')
const randomChar = require('../utils/randomChar')
const inventory_img_storage = multer.diskStorage({
	destination: 'inventory_img/',
	limits: {
		fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
	},
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()}-${randomChar}${path.extname(
			file.originalname
		)}`
		cb(null, uniqueName)
	},
})
const upload = multer({ storage: inventory_img_storage })

inventoryRouter.get('/', async (req, res, next) => {
	const items = await Inventory.findAll({})
	res.json(items)
})
inventoryRouter.get('/:item_id', async (req, res, next) => {
	const item = await Inventory.findByPk(req.params.item_id)
	if (!item) {
		return res.status(404).json({ error: 'Item not found' })
	}
	res.json(item)
})

inventoryRouter.post('/', upload.single('image'), async (req, res, next) => {
	const newItem = req.body
	const item = await Inventory.create({
		...newItem,
		imageUrl: req.file ? `/inventory_img/${req.file.filename}` : null,
	})

	try {
		const log = await Log.create({
			reference_id: item.item_id,
			action: 'CREATE',
			action_date: new Date(),
			details: 'Added a new item',
			user_id: item.user_id,
		})
		console.log(log)
	} catch (err) {
		console.log(err)
	}
	res.status(201).json(item)
})

inventoryRouter.put(
	'/:item_id',
	upload.single('image'),
	async (req, res, next) => {
		const itemId = req.params.item_id
		const updatedData = req.body
		const item = await Inventory.findByPk(itemId)
		//  console.log(patient)

		if (!item) {
			return res.status(404).json({ message: `Item not found` })
		}
		//console.log(updatedData)
		const updatedItem = await Inventory.update({
			...updatedData,
			imageUrl: req.file && `/inventory_img/${req.file.filename}`,
		})
		console.log('filename', req.file?.filename)
		try {
			const log = await Log.create({
				reference_id: item.item_id,
				action: 'CREATE',
				action_date: new Date(),
				details: 'Updated item details',
				user_id: item.user_id,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(201).json(updatedItem)
	}
)

inventoryRouter.delete('/:item_id/:userId', async (req, res, next) => {
	try {
		const item = await Inventory.findByPk(req.params.item_id)

		if (!item) {
			return res.status(404).json({ error: 'Item not found' })
		}
		await item.destroy()
		try {
			const log = await Log.create({
				reference_id: item.item_id,
				action: 'DELETE',
				action_date: new Date(),
				details: 'Deleted a item',
				user_id: req.params.userId,
			})
			console.log(log)
		} catch (err) {
			console.log(err)
		}
		res.status(200).json({ message: 'Item deleted successfully' })
	} catch (error) {
		// Handle any errors during the process
		//console.error('Error deleting frame:', error)
		res.status(500).json({ error: 'Failed to delete item' })
	}
})
module.exports = inventoryRouter
