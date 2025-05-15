'use client'

import { Button } from '../ui/button'
import {
	Form,
	FormField,
	FormLabel,
	FormMessage,
	FormControl,
	FormItem,
} from '../ui/form'

import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectValue,
	SelectContent,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import prescripFormSchema from '../zodSchema/prescriptionFormSchema'
import PrescriptionServices from '@/services/prescriptionServices'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import CustomSelect from '../CustomSelect'
import useOptions from '@/hooks/useOptions'
import useAuth from '@/hooks/useAuth'
import { useContext } from 'react'
import { PatientContext } from '../PatientProfile'

const PrescriptionForm = ({ setSuccess, setIsOpen }) => {
	const { patient } = useContext(PatientContext)
	const { auth } = useAuth()
	const { toast } = useToast()
	const navigate = useNavigate()
	const prescriptionServices = new PrescriptionServices()
	const now = new Date()
	const oneYearFromNow = new Date(now)
	oneYearFromNow.setFullYear(now.getFullYear() + 1)
	const memoizedOptions = useOptions()
	const { addOptions } = memoizedOptions()

	const prescripForm = useForm({
		resolver: zodResolver(prescripFormSchema),
		defaultValues: {
			prescription_date: now.toLocaleDateString('en-US', {
				month: 'long',
				year: 'numeric',
				day: 'numeric',
			}),
			prescription_expiry_date: oneYearFromNow.toLocaleDateString(
				'en-US',
				{
					month: 'long',
					year: 'numeric',
					day: 'numeric',
				}
			),
			prescription_details: {
				odSphere:
					patient.visual_data?.checkUpData.refractionSphereRight,
				odCylinder:
					patient.visual_data?.checkUpData.refractionCylinderRight,
				odAxis: patient.visual_data?.checkUpData.refractionAxisRight,
				odAdd: '',
				osSphere: patient.visual_data?.checkUpData.refractionSphereLeft,
				osCylinder:
					patient.visual_data?.checkUpData.refractionCylinderLeft,
				osAxis: patient.visual_data?.checkUpData.refractionAxisLeft,
				osAdd: '',
				lensType: '',
				frameMaterial: '',
				frameModel: '',
			},
		},
	})

	const handleSubmit = async () => {
		const prescripData = prescripForm.getValues()
		try {
			console.log(prescripData)
			const prescrip = await prescriptionServices.addPrescription({
				...prescripData,
				user_id: auth.user.user_id,
				patient_id: patient.patient_id,
			})
			console.log('prescrip', prescrip)
			toast({
				title: 'Success',
				description: `Prescription added for ${patient.first_name}`,
				duration: 3000,
			})
			setSuccess(true)
			setIsOpen(false)
			navigate(`/patients/profile/${patient.patient_id}`)
		} catch (e) {
			console.log(e)
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: e.response?.data.error,
				duration: 3000,
			})
		}

		//console.log(visitForm.getValues())
	}
	return (
		<Form {...prescripForm}>
			<form onSubmit={prescripForm.handleSubmit(handleSubmit)}>
				<ScrollArea className='h-[500px] '>
					<div className='mx-3 my-2 '>
						<div className='my-2'>
							<FormField
								control={prescripForm.control}
								name='prescription_date'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Prescription Date</FormLabel>
										<FormControl>
											<Input step='0.25' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_expiry_date'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Prescription Expiry Date
										</FormLabel>
										<FormControl>
											<Input step='0.25' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormLabel>Prescription Lens</FormLabel>
						<div className='grid grid-cols-5 gap-4 text-center font-semibold mb-2 text-sm'>
							<div className='col-span-1'></div>
							<div>Sphere</div>
							<div>Cylinder</div>
							<div>Axis</div>
							<div>ADD</div>
						</div>
						<div className='grid grid-cols-5 gap-4 mb-4 items-center'>
							<div className=' text-sm font-semibold text-right'>
								OD (Right)
							</div>
							<FormField
								control={prescripForm.control}
								name='prescription_details.odSphere'
								render={({ field }) => {
									return (
										<FormItem>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.odCylinder'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Cylinder</FormLabel> */}
										<FormControl>
											<Input
												{...field}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.odAxis'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Axis</FormLabel> */}
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.odAdd'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Add</FormLabel> */}
										<FormControl>
											<CustomSelect
												options={addOptions}
												field={field}
												label='None'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid grid-cols-5 gap-4 items-center'>
							<div className='font-semibold text-right text-sm'>
								OS (Left)
							</div>
							<FormField
								control={prescripForm.control}
								name='prescription_details.osSphere'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Sphere</FormLabel> */}
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.osCylinder'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Cylinder</FormLabel> */}
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.osAxis'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Axis</FormLabel> */}
										<FormControl>
											<Input
												{...field}
												defaultValue={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.osAdd'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Add</FormLabel> */}
										<FormControl>
											<CustomSelect
												label='None'
												options={addOptions}
												field={field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='space-y-4'>
							<FormField
								control={prescripForm.control}
								name='prescription_details.lensType'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Lens Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select lens type' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Single'>
													Single Vision
												</SelectItem>
												<SelectItem value='Bifocal'>
													Bifocal
												</SelectItem>
												<SelectItem value='Progressive'>
													Progressive
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={prescripForm.control}
								name='prescription_details.frameMaterial'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Frame Material</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select material' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Metal'>
													Metal
												</SelectItem>
												<SelectItem value='Plastic'>
													Plastic
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={prescripForm.control}
								name='prescription_details.frameModel'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Frame Material</FormLabel>
										<Input
											placeholder='Enter frame model'
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={prescripForm.control}
								name='prescription_details.d_notes'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Additional Notes</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Enter any additional notes'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</ScrollArea>
				<div>
					<Button className='w-full my-3' type='submit'>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default PrescriptionForm
