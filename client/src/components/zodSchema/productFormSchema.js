import * as z from 'zod'

const productSchema = z.object({
	item_name: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	color: z.string().min(2, {
		message: 'Product color must be at least 2 characters.',
	}),
	material: z.string().min(2, {
		message: 'Product material must be at least 2 characters.',
	}),
	item_type: z.string().min(2, {
		message: 'Product type must be at least 2 characters.',
	}),
	stockQuantity: z.preprocess(
		x => (x ? x : undefined),
		z.coerce
			.number({ invalid_type_error: 'This field is required' })
			.min(0, 'Stock cannot be negative')
	),
	price: z.preprocess(
		x => (x ? x : undefined),
		z.coerce
			.number({ invalid_type_error: 'This field is required' })
			.min(0, 'Price cannot be negative')
	),
	image: z.any().optional(),
})
export default productSchema
