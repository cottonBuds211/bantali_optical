const jwt = require('jsonwebtoken')
const { createToken, maxAge } = require('../utils/jwt') // Replace with the actual file path

describe('createToken', () => {
	it('should generate a valid JWT', () => {
		const name = 'John Doe'
		const token = createToken(name)
		console.log(token)

		// Verify the token structure and payload
		const decodedToken = jwt.verify(token, process.env.SECRET)
		expect(decodedToken.name).toBe(name)
		expect(decodedToken.iat).toBeDefined() // Issued at timestamp
		expect(decodedToken.exp).toBeDefined() // Expiration timestamp
	})
})
