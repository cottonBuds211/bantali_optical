import * as z from 'zod'

// Define your schema with validation rules
const billingFormSchema = z
	.object({
		serviceFee: z.preprocess(
			x => (x ? x : undefined),
			z.coerce
				.number({ invalid_type_error: 'This field is required' })
				.min(0, 'Paid amount cannot be negative')
		),
		lensCost: z.preprocess(
			x => (x ? x : undefined),
			z.coerce
				.number({ invalid_type_error: 'This field is required' })
				.min(0, 'Paid amount cannot be negative')
		),
		itemCost: z.coerce
			.number({ invalid_type_error: 'This field is required' })
			.min(0, 'Paid amount cannot be negative'),

		initialPayment: z.preprocess(
			x => (x ? x : undefined),
			z.coerce
				.number({ invalid_type_error: 'This field is required' })
				.min(0, 'Paid amount cannot be negative')
		),
		discount: z.preprocess(
			x => (x ? x : undefined),
			z.coerce
				.number()
				.min(0, 'Paid amount cannot be negative')
				.optional()
		),
		// totalAmount: z.preprocess(
		// 	x => (x ? x : undefined),
		// 	z.coerce
		// 		.number({ invalid_type_error: 'This field is required' })
		// 		.min(0, 'Total amount cannot be negative')
		// ),
	})
	.refine(
		data =>
			data.discount <= data.serviceFee + data.lensCost + data.itemCost,
		{
			message: 'Discount cannot exceed the total amount.',
			path: ['discount'],
		}
	)
	.refine(
		data =>
			data.initialPayment <=
			data.serviceFee + data.lensCost + data.itemCost - data.discount,
		{
			message:
				'Initial payment cannot exceed the remaining amount after the discount.',
			path: ['initialPayment'],
		}
	)

// Export the schema
export default billingFormSchema
