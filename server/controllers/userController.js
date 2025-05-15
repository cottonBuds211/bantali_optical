const userRouter = require('express').Router()
const db = require('../models')
const { User } = db
const bcrypt = require('bcrypt')
const { hashPassword } = require('../utils/hashPassword')
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

//add new user
userRouter.post('/register', async (req, res, next) => {
	const user = req.body

	const duplicateUserName = await User.findOne({
		where: { user_name: user.user_name },
	})
	const duplicateUser = await User.findOne({
		where: { name: user.name },
	})
	const duplicateEmail = await User.findOne({
		where: { email: user.email },
	})

	if (duplicateUserName) {
		res.status(409).json('Username already taken!')
	} else if (duplicateUser) {
		res.status(409).json('User already registered!')
	} else if (duplicateEmail) {
		res.status(409).json('Email already taken!')
	} else {
		const newUser = await User.create({
			...user,
			active: true,
		})
		res.status(201).json(newUser)
	}
})

userRouter.put('/accounts/:id', async (req, res, next) => {
	const user = await User.findByPk(req.params.id)
	const updatedData = req.body

	if (!user) {
		res.status(404).json({ error: 'user not found' }).end()
	}
	const data = await user.update(updatedData)
	res.status(201).json(data)
})

userRouter.put('/deactivate-account/:id', async (req, res, next) => {
	const user = await User.findByPk(req.params.id)

	if (!user) {
		res.status(404).json({ error: 'user not found' }).end()
	}
	const data = await user.update({ active: false })
	res.status(201).json(data)
})

userRouter.put('/activate-account/:id', async (req, res, next) => {
	const user = await User.findByPk(req.params.id)

	if (!user) {
		res.status(404).json({ error: 'user not found' }).end()
	}
	const data = await user.update({ active: true })
	res.status(201).json(data)
})

userRouter.put('/change-password/:id', async (req, res, next) => {
	const user = await User.findByPk(req.params.id)
	const { old_password, new_password } = req.body
	const now = new Date()

	if (!user) {
		res.status(404).json({ error: 'user not found' }).end()
	}
	let isMatch
	if (user.temp_password && user.temp_password_expires > now) {
		isMatch = await bcrypt.compare(password, user.temp_password)
	} else {
		isMatch = await bcrypt.compare(old_password, user.password)
	}

	if (!isMatch) {
		return res.status(400).json({ error: 'Incorrect old password' })
	}
	const hashedPassword = await hashPassword(new_password)
	await user.update({
		password: hashedPassword,
		temp_password: null,
		temp_password_expires: null,
	})
	res.status(201).json({ message: 'Password updated!' })
})

module.exports = userRouter
