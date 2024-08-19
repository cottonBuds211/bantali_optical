const { hashPassword } = require('../utils/hashPassword')
const bcrypt = require('bcrypt')

describe('hashPassword', () => {
	it('should hash a password correctly', async () => {
		const password = 'myPassword'
		const saltRounds = 10
		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(password.toString(), salt)
		console.log(hashedPassword)
		expect(hashedPassword).toBeDefined()
		expect(typeof hashedPassword).toBe('string')
	})

	it('should produce different hashes for different passwords', async () => {
		const password1 = 'password1'
		const password2 = 'password2'

		const hash1 = await hashPassword(password1)
		const hash2 = await hashPassword(password2)

		expect(hash1).not.toBe(hash2)
	})
})
