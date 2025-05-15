import { z } from 'zod'

const patientSchema = z.object({
	first_name: z.string().trim().min(2, {
		message: 'First name is required',
	}),
	middle_name: z.string().trim().optional(),
	last_name: z.string().trim().min(1, { message: 'Last name is required' }),
	date_of_birth: z.date({
		message: 'A date of birth is required.',
	}),
	gender: z.string().trim().min(1, { message: 'Gender is required' }),
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.optional()
		.or(z.literal('')),
	contact_number: z
		.string()
		.trim()
		.refine(
			value => {
				value = value.replace(/\s/g, '')
				const phoneRegExp = /^\d{10}$/ // Adjust the regex for your region's format
				return phoneRegExp.test(value)
			},
			{ message: 'Invalid phone number format' }
		),
	address: z.string().trim().min(1, { message: 'Address is required' }),
	medical_conditions: z.string().trim().optional(),
	user_id: z.number(),
})

export default patientSchema
