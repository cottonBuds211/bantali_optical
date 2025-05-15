require('dotenv').config()
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createRefreshToken = username => {
	return jwt.sign({ username }, process.env.REFRESH_SECRET, {
		expiresIn: '1d',
	})
}

const createAccessToken = username => {
	return jwt.sign({ username }, process.env.ACCESS_SECRET, {
		expiresIn: '1h',
	})
}
module.exports = { createAccessToken, createRefreshToken, maxAge }
