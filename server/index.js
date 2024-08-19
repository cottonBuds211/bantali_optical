const db = require('./models')
const app = require('./app')
const seedPatients = require('./seeders/seedPatients')

db.sequelize.sync().then(async req => {
	//await seedPatients(db.sequelize)
	app.listen('3002', () => {
		console.log('server running with dummy data')
	})
})
