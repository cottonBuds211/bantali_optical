import { z } from 'zod'
const requestFormSchema = z.object({
	first_name: z.string().trim().min(2, {
		message: 'First name is required',
	}),
	last_name: z.string().trim().min(1, { message: 'Last name is required' }),
	appointment_date: z.date({
		message: 'An appointment date is required.',
	}),
	appointment_time_start: z
		.string({
			required_error: 'Please select a time slot.',
		})
		.min(1, { message: 'Please select a time slot.' }),
	email: z
		.string()
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email address' }),
	phone: z
		.string()
		.trim()
		.min(1, { message: 'Phone number is required.' })
		.refine(
			value => {
				const phoneRegExp = /^\d{10}$/
				return phoneRegExp.test(value)
			},
			{ message: 'Invalid phone number format' }
		),

	user_id: z.number().optional(),
})

export default requestFormSchema
