import { z } from 'zod'
const prescripFormSchema = z.object({
	prescription_details: z
		.object({
			odSphere: z.preprocess(
				x => (x ? x : undefined),
				z.coerce.number().min(-8).max(8).nullish()
			),
			odCylinder: z.preprocess(
				x => (x ? x : undefined),
				z.coerce.number().min(-6).max(6).nullish()
			),
			odAxis: z.preprocess(
				x => (x ? x : undefined),
				z.coerce.number().min(0).max(180).nullish()
			),
			odAdd: z.string().optional(),
			osSphere: z.preprocess(
				x => (x ? x : undefined),
				z.coerce.number().min(-8).max(8).nullish()
			),
			osCylinder: z.preprocess(
				x => (x ? x : undefined),
				z.coerce.number().min(-6).max(6).nullish()
			),
			osAxis: z.preprocess(
				x => (x ? x : undefined),
				z.coerce.number().min(0).max(180).nullish()
			),
			osAdd: z.string().optional(),
			lensType: z.string().optional().nullish(),
			frameMaterial: z.string().optional(),
			frameModel: z.string().optional().nullish(),
		})
		.required(),
})

export default prescripFormSchema
