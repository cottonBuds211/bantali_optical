const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization']
	//console.log(authHeader)
	if (!authHeader) return res.status(401).json({ message: 'No Token' })
	//console.log(authHeader)
	const token = authHeader.split(' ')[1]
	jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
		if (err) return res.status(403).send('TOKEN NOT VERIFIED')
		req.user = decoded.user_name
		next()
	})
}
module.exports = verifyJWT
