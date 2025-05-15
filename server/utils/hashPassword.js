const bcrypt = require('bcrypt')
const crypto = require('crypto')

const hashPassword = async password => {
	const saltRounds = 10
	const salt = await bcrypt.genSalt(saltRounds)
	const hashedPassword = await bcrypt.hash(password, salt)
	return hashedPassword
}

const generateTempPassword = (length = 12) => {
	return crypto.randomBytes(length).toString('base64').slice(0, length)
}
module.exports = { hashPassword, generateTempPassword }
