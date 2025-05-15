import { z } from 'zod'

const loginSchema = z.object({
	user_name: z.string().min(5, {
		message: 'Username is required',
	}),
	password: z.string().trim().min(1, { message: 'Password is required' }),
})
const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Invalid email address' }),
})
export { loginSchema, forgotPasswordSchema }
