import { z } from 'zod'

const userSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(50, { message: 'Name must not exceed 50 characters' }),
		user_name: z
			.string()
			.min(4, { message: 'Username must be at least 4 characters' })
			.max(30, { message: 'Username must not exceed 30 characters' }),
		email: z.string().email({ message: 'Please enter a valid email' }),
		role: z.enum(['Admin', 'Staff'], { message: 'Invalid role' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' })
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter',
			})
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter',
			})
			.regex(/[0-9]/, {
				message: 'Password must contain at least one number',
			})
			.regex(/[@$!%*?&]/, {
				message:
					'Password must contain at least one special character (@, $, !, %, *, ?, &)',
			}),
		confirm_password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' }),
	})
	.refine(data => data.password === data.confirm_password, {
		path: ['confirm_password'],
		message: 'Passwords do not match',
	})

export default userSchema
