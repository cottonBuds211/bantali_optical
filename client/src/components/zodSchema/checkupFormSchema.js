import { z } from 'zod'
const checkUpFormSchema = z.object({
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

	refractionSphereRight: z.preprocess(
		x => (x ? x : undefined),
		z.coerce.number().nullish()
	),
	refractionSphereLeft: z.preprocess(
		x => (x ? x : undefined),
		z.coerce.number().nullish()
	),
	refractionCylinderRight: z.preprocess(
		x => (x ? x : undefined),
		z.coerce.number().nullish()
	),
	refractionCylinderLeft: z.preprocess(
		x => (x ? x : undefined),
		z.coerce.number().nullish()
	),
	refractionAxisRight: z.preprocess(
		x => (x ? x : undefined),
		z.coerce.number().nullish()
	),
	refractionAxisLeft: z.preprocess(
		x => (x ? x : undefined),
		z.coerce.number().nullish()
	),
	colorBlind: z.enum(['Yes', 'No']),
	colorBlindType: z.string().optional(),
	colorBlindSeverity: z.enum(['Mild', 'Severe']).optional(),
	eyeMovementCoordination: z.enum(['Normal', 'Abnormal']),
	docNotes: z.string().nullish(),
})

export default checkUpFormSchema
