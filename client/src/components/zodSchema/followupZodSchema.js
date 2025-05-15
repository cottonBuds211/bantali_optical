import { z } from 'zod'
const followUpFormSchema = z.object({
	reason_for_follow_up: z.string().min(5, {
		message: 'This field is required',
	}),
})

export default followUpFormSchema
