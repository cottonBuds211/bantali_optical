const db = require('./models')
const server = require('./app')
const seedPatients = require('./seeders/seedPatients')

db.sequelize.sync().then(async req => {
	//await seedPatients(db.sequelize)
	//'192.168.56.1',
	server.listen('3002', () => {
		console.log('server running with dummy data')
	})
})
