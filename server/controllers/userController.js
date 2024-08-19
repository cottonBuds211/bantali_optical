const userRouter = require('express').Router()
const db = require('../models')
const { User } = db
const bcrypt = require('bcrypt')

//get all users
userRouter.get('/accounts', async (req, res, next) => {
	const users = await User.findAll({})
	res.json(users)
})

//get single user by id
userRouter.get('/accounts/:id', async (req, res, next) => {
	const user = await User.findByPk(req.params.id)
	if (user) {
		res.json(user)
	} else {
		res.status(404).json({ error: 'user not found' }).end()
	}
})

userRouter.post('/login', async (req, res, next) => {
	const username = req.body.user_name
	const password = req.body.password

	const user = await User.findOne({ where: { user_name: username } })
	if (!user) {
		return res.status(404).json({ error: 'User not found!' }).end()
	}
	bcrypt.compare(password, user.password, (err, data) => {
		if (data) {
			res.status(200).json(user)
		} else {
			return res.status(400).json({ error: 'Wrong password!' }).end()
		}
	})
})

//add new user
userRouter.post('/register', async (req, res, next) => {
	const user = req.body
	const newUser = await User.create({
		...user,
		active: true,
	})
	res.status(201).json(newUser)
})

module.exports = userRouter
