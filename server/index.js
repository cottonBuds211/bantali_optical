const db = require('./models')
const server = require('./app')
const seedUser = require('./seeders/seedUsers')

db.sequelize.sync().then(async req => {
	//await seedPatients(db.sequelize)
	await seedUser(db.sequelize)
	//'192.168.56.1',
	server.listen('3002', () => {
		console.log('server running with dummy data')
	})
})
