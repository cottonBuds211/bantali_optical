const errorHandler = (error, req, res, next) => {
	console.log(error.name)

	if (error.name === 'SequelizeValidationError') {
		const errors = error.errors.map(err => err.message) // Extract validation errors
		console.log(errors)
		return res
			.status(400)
			.send({ error: 'Missing required fields!', details: errors })
	} else if (error.name === 'SequelizeUniqueConstraintError') {
		// Handle duplicate entry error
		const errors = error.errors.map(err => err.message)
		return res
			.status(409)
			.send({ error: 'Duplicate entry', details: errors })
	}
	next(error)
}

const unknownEndPoint = (req, res) => {
	res.status(404).send({ error: 'Unknown Endpoint' })
}
module.exports = { errorHandler, unknownEndPoint }
