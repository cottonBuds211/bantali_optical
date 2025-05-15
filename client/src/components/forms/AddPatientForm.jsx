'use client'
import { useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
	FormDescription,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import patientSchema from '../zodSchema/patientZodSchema'
import PatientServices from '@/services/patientServices'
import GenderSelect from '../GenderSelect'
import DatePickerPopover from '../DatePickerPopover'
import { useToast } from '../ui/use-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { PhoneInput } from '../PhoneInput'
import { useEffect } from 'react'
const AddPatientForm = () => {
	const { auth } = useAuth()
	const patientServices = new PatientServices()
	const { toast } = useToast()
	const navigate = useNavigate()
	const location = useLocation()
	//define Form
	const form = useForm({
		resolver: zodResolver(patientSchema),
		defaultValues: {
			first_name: '',
			middle_name: '',
			last_name: '',
			date_of_birth: null,
			gender: '',
			contact_number: '',
			address: '',
			medical_conditions: '',
			user_id: auth.user.user_id,
		},
	})
	const { setValue } = form
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search)
		setValue('first_name', searchParams.get('first_name') || '')
		setValue('last_name', searchParams.get('last_name') || '')
		setValue('contact_number', searchParams.get('phone') || '')
		setValue('email', searchParams.get('email') || '')
	}, [location.search, setValue])
	console.log(form.getValues())
	//OnSubmit function
	const onSubmit = async data => {
		try {
			const patient = await patientServices.addPatient(data)
			toast({
				title: 'Success',
				description: `${patient.first_name} added to the database`,
				duration: 3000,
			})
			navigate(`/patients/profile/${patient.patient_id}`)
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: err.response?.data.error,
				duration: 3000,
			})
		}
	}
	return (
		// TODO: Handle duplicate input
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='box-border lg:px-10 py-5 h-full space-y-5'>
					<div className='flex flex-row space-x-4 '>
						{/* First name */}
						<FormField
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder='John'
											{...field}
											onChange={e => {
												const value = e.target.value
												if (
													/^[A-Za-z ]*$/.test(value)
												) {
													field.onChange(value) // Only update if input is valid
												}
											}}
										/>
									</FormControl>
									<FormMessage></FormMessage>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='last_name'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>Last Name</FormLabel>

									<FormControl>
										<Input
											{...field}
											placeholder='Doe'
											onChange={e => {
												const value = e.target.value
												if (
													/^[A-Za-z ]*$/.test(value)
												) {
													field.onChange(value) // Only update if input is valid
												}
											}}
										/>
									</FormControl>
									<FormMessage></FormMessage>
								</FormItem>
							)}
						/>
					</div>
					{/* Phone Number */}
					<PhoneInput
						control={form.control}
						name={'contact_number'}
					/>
					{/* Email */}
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Email Address (Optional)'
										type='email'
									/>
								</FormControl>
								<FormMessage></FormMessage>
							</FormItem>
						)}
					/>

					<div className='flex flex-col lg:flex-row space-x-4'>
						{/* Date of Birth */}
						<FormField
							control={form.control}
							name='date_of_birth'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>Date of Birth</FormLabel>
									<FormControl>
										<DatePickerPopover field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Gender */}
						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<GenderSelect field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Address */}
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Balili La Trinidad'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='medical_conditions'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Medical History</FormLabel>

								<FormControl>
									<Input
										{...field}
										placeholder='Diabietes etc...'
									/>
								</FormControl>
								<FormDescription className='text-xs'>
									Separate each medical condition with space
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end mt-5'>
						<Button
							className='w-full'
							type='submit'
							disabled={form.formState.isSubmitting}
						>
							Submit
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}

export default AddPatientForm
