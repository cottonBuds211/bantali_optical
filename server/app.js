const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const patientRouter = require('./controllers/patientController')
const userRouter = require('./controllers/userController')
const middleWare = require('./utils/middleware')
const visitationRouter = require('./controllers/visitationController')
const checkupRouter = require('./controllers/checkupController')
const followUpRouter = require('./controllers/followUpController')
const prescriptionRouter = require('./controllers/prescriptionController')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/patients', patientRouter)
app.use('/api/users', userRouter)
app.use('/api/visitation', visitationRouter)
app.use('/api/checkup', checkupRouter)
app.use('/api/followup', followUpRouter)
app.use('/api/prescription', prescriptionRouter)

app.use(middleWare.unknownEndPoint)
app.use(middleWare.errorHandler)

module.exports = app
