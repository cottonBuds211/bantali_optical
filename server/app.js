const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const patientRouter = require('./controllers/patientController')
const userRouter = require('./controllers/userController')
const error = require('./middleware/errorMiddleware')
const visitationRouter = require('./controllers/visitationController')
const cookieParser = require('cookie-parser')
const authRouter = require('./controllers/authController')
const verifyToken = require('./middleware/authMiddleware')
const appointmentRouter = require('./controllers/appointmentController')
const notificationRouter = require('./controllers/notificationController')
const inventoryRouter = require('./controllers/inventoryController')
const path = require('path')

const http = require('http')
const { Server } = require('socket.io')
const billingRouter = require('./controllers/billingController')
const salesRouter = require('./controllers/salesController')
const backUpRouter = require('./controllers/backupRestoreController')
const logRouter = require('./controllers/logsController')

let adminSocket = null

app.use(express.json())
app.use(cookieParser())

app.use(
	cors({
		origin: [
			'http://192.168.43.178:5173',
			'http://localhost:5173',
			'http://admin.localhost:5173',
		],
		credentials: true, // Allow credentials (cookies)
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'Authorization',
		],
	})
)

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: [
			'http://admin.192.168.43.178:5173',
			'http://admin.localhost:5173',
			'http://localhost:5173',
		],
		credentials: true, // Allow credentials (cookies)
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'Authorization',
		],
	},
})

io.on('connection', socket => {
	console.log(`User Connected: ${socket.id}`)

	socket.on('admin-connected', () => {
		adminSocket = socket.id
		console.log('Admin connected:', adminSocket)
	})

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id)
		if (socket.id === adminSocket) {
			adminSocket = null
			console.log('Admin disconnected')
		}
	})
})

app.use((req, res, next) => {
	req.io = io
	req.adminSocket = adminSocket
	next()
})
app.use(
	'/inventory_img',
	express.static(path.join(__dirname, '/inventory_img'))
)
app.use('/api/auth', authRouter)
app.use('/api/appointments', appointmentRouter)
app.use('/api/users', userRouter)

app.use(verifyToken)
app.use('/api/inventory', inventoryRouter)
app.use('/api/logs', logRouter)
app.use('/api/sales', salesRouter)
app.use('/api/billings', billingRouter)
app.use('/api/notifications', notificationRouter)
app.use('/api/patients', patientRouter)
app.use('/api/visitation', visitationRouter)
app.use('/api/backup/', backUpRouter)

app.use(error.unknownEndPoint)
app.use(error.errorHandler)

module.exports = server
