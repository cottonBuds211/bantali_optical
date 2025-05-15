import { z } from 'zod'
const visitFormSchema = z.object({
	visit_data: z.object({
		visualAcuityNearRight: z
			.string()
			.trim()
			.min(5, {
				message: 'Invalid number',
			})
			.max(6, {
				message: 'Invalid number',
			})
			.nullish(),
		visualAcuityNearLeft: z
			.string()
			.trim()
			.min(5, {
				message: 'Invalid number',
			})
			.max(6, {
				message: 'Invalid number',
			})
			.nullish(),
		visualAcuityDistanceRight: z
			.string()
			.trim()
			.min(5, {
				message: 'Invalid number',
			})
			.max(6, {
				message: 'Invalid number',
			})
			.nullish(),
		visualAcuityDistanceLeft: z
			.string()
			.trim()
			.min(5, {
				message: 'Invalid number',
			})
			.max(6, {
				message: 'Invalid number',
			})
			.nullish(),

		odSphere: z.preprocess(x => (x ? x : undefined), z.coerce.number()),
		osSphere: z.preprocess(x => (x ? x : undefined), z.coerce.number()),
		odCyl: z.preprocess(
			x => (x ? x : undefined),
			z.coerce.number().nullish()
		),
		osCyl: z.preprocess(
			x => (x ? x : undefined),
			z.coerce.number().nullish()
		),
		odAxis: z.preprocess(
			x => (x ? x : undefined),
			z.coerce.number().nullish()
		),
		odAdd: z.preprocess(
			x => (x ? x : undefined),
			z.coerce.number().nullish()
		),
		osAxis: z.preprocess(
			x => (x ? x : undefined),
			z.coerce.number().nullish()
		),
		osAdd: z.preprocess(
			x => (x ? x : undefined),
			z.coerce.number().nullish()
		),
		lensType: z.string().trim().min(2, {
			message: 'Lense type is required',
		}),

		docNotes: z.string().nullish(),
	}),
})

export default visitFormSchema
