require('dotenv').config
const authRouter = require('express').Router()
const db = require('../models')
const { User, Auth, Log } = db
const {
	createRefreshToken,
	createAccessToken,
	maxAge,
} = require('../utils/jwtHelper')
const bcrypt = require('bcrypt')
const { generateTempPassword } = require('../utils/hashPassword')
const { sendTempPasswordEmail } = require('../utils/mailer')
const jwt = require('jsonwebtoken')

authRouter.post('/login', async (req, res, next) => {
	const { user_name, password } = req.body

	const user = await User.login(user_name, password)

	if (!user) {
		// If user doesn't exist or password is incorrect
		const attempt = await User.findOne({ where: { user_name: user_name } })
		if (attempt) {
			await Log.create({
				reference_id: attempt.user_id,
				action: 'LOGIN',
				action_date: new Date(),
				details: 'Failed login attempt',
				user_id: attempt.user_id,
			})
		}
		return res.status(400).json({ error: 'Invalid username or password' })
	}

	const accessToken = createAccessToken(user.user_name)
	const refreshToken = createRefreshToken(user.user_name)
	res.cookie('jwt', refreshToken, {
		maxAge: maxAge * 1000,
		httpOnly: true,
		secure: true,
		sameSite: 'None',
	})
	//Add token to db
	await Auth.create({
		token: refreshToken,
		user_id: user.user_id,
	})
	try {
		const log = await Log.create({
			reference_id: user.user_id,
			action: 'LOGIN',
			action_date: new Date(),
			details: 'Logged in',
			user_id: user.user_id,
		})
		//console.log(log)
	} catch (err) {
		console.log(err)
	}
	res.status(200).json({ accessToken, user })
})

authRouter.post('/request-temp-password', async (req, res) => {
	console.log('email request', req.body)
	const user = await User.findOne({ where: { email: req.body.email } })
	if (!user) {
		return res.status(404).send('Account not found.')
	}
	const tempPassword = generateTempPassword()
	const hashedTempPassword = await bcrypt.hash(tempPassword, 10)

	user.temp_password = hashedTempPassword
	user.temp_password_expires = Date.now() + 30 * 60 * 1000 // 30 minutes
	await user.save()

	await sendTempPasswordEmail(user.email, tempPassword)
	res.json({ message: 'Temporary password sent to your email.' })
})

authRouter.get('/refresh', async (req, res, next) => {
	const cookies = req.cookies
	//console.log(cookies.jwt)
	if (!cookies?.jwt) return res.status(401).json({ error: 'No cookie found' })

	//console.log(cookies.jwt)
	const refreshToken = cookies.jwt
	//console.log('refreshToken: ', refreshToken)
	const foundUser = await Auth.findOne({ where: { token: refreshToken } })
	//console.log('user Found')
	if (!foundUser) return res.sendStatus(403)

	const user = await User.findOne({ where: { user_id: foundUser.user_id } })

	jwt.verify(
		refreshToken,
		process.env.REFRESH_SECRET,
		async (err, decoded) => {
			if (err || user.user_name !== decoded?.username) {
				//console.log('username dont match')
				return res.sendStatus(403)
			}
			const accessToken = createAccessToken({
				username: decoded?.user_name,
			})
			//console.log('REFRESH')
			//console.log(accessToken, user)
			res.json({ accessToken, user })
		}
	)
})

authRouter.get('/logout', async (req, res, next) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204)
	const refreshToken = cookies.jwt

	const foundUser = await Auth.findOne({ where: { token: refreshToken } })
	//console.log(foundUser)
	if (!foundUser) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		})
		return res.sendStatus(204)
	}

	//delete cookie in the db
	foundUser.token = ''
	const result = await foundUser.save()
	//console.log(result)
	//console.log('Logout')

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	res.sendStatus(204)
})

module.exports = authRouter
