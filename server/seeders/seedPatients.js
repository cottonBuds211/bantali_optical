const { Sequelize, DataTypes } = require('sequelize')
const { faker } = require('@faker-js/faker')
// Import Faker if you installed it

// Assuming your Patient model is defined in a separate file (e.g., patient.js)

const db = require('../models')
const { Patient } = db

async function seedPatients(sequelize) {
	// Define the number of dummy patients you want to create
	const numberOfPatients = 100 // Adjust this value as needed

	// Loop through the desired number of patients
	for (let i = 0; i < numberOfPatients; i++) {
		const firstName = faker ? faker.person.firstName() : 'John' // Use Faker or a default
		const middleName = faker ? faker.person.middleName() : 'Doe' // Use Faker or a default
		const lastName = faker ? faker.person.lastName() : 'Smith' // Use Faker or a default
		const dateOfBirth = new Date(
			Math.floor(Math.random() * (new Date().getFullYear() - 18)) + 18,
			Math.floor(Math.random() * 12),
			Math.floor(Math.random() * 30) + 1
		) // Random date of birth between 18 and current year
		const gender = Math.random() > 0.5 ? 'Male' : 'Female'
		const phoneNumber = faker
			? faker.phone.number('###########')
			: '12345678901' // Use Faker or a default
		const address = faker ? faker.location.streetAddress() : '123 Main St' // Use Faker or a default

		console.log(Patient)

		// Create a new Patient instance with the generated data
		const patient = await Patient.create({
			firstName: firstName,
			middleName: middleName,
			lastName: lastName,
			dateOfBirth: dateOfBirth,
			gender: gender,
			phoneNumber: phoneNumber,
			address: address,
			active: true,
		})

		console.log(`Created Patient: ${patient.patient_id}`) // Optional: Log creation message
	}
}

module.exports = seedPatients
