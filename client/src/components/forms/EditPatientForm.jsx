'use client'
import { useContext } from 'react'
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
} from '@/components/ui/form'
import PatientServices from '@/services/patientServices'
import { zodResolver } from '@hookform/resolvers/zod'
import patientSchema from '../zodSchema/patientZodSchema'
import GenderSelect from '../GenderSelect'
import DatePickerPopover from '../DatePickerPopover'
import { useToast } from '../ui/use-toast'
import { ScrollArea } from '../ui/scroll-area'
import useAuth from '@/hooks/useAuth'
import { PhoneInput } from '../PhoneInput'
import { usePatient } from '@/context/PatientContext'
const EditPatientForm = ({ setOpen }) => {
	const { auth } = useAuth()
	const { patient, setSuccessPatient } = usePatient()

	const patientServices = new PatientServices()
	const { toast } = useToast()
	//define Form
	const form = useForm({
		resolver: zodResolver(patientSchema),
		defaultValues: {
			first_name: patient.first_name,
			middle_name: patient.middle_name,
			last_name: patient.last_name,
			date_of_birth: new Date(patient.date_of_birth),
			gender: patient.gender,
			contact_number: patient.contact_number,
			email: patient.email ? patient.email : '',
			address: patient.address,
			medical_conditions: patient.medical_conditions,
			user_id: auth.user.user_id,
		},
	})

	//OnSubmit function
	const onSubmit = async data => {
		try {
			const editedPatient = await patientServices.editPatient(
				data,
				patient.patient_id
			)
			toast({
				title: 'Success',
				description: `${editedPatient.first_name}'s information has been edited`,
			})
			setSuccessPatient(true)
			setOpen(false)
		} catch (err) {
			toast({
				title: 'Failed',
				description: err.response?.data.error,
			})
		}
	}

	return (
		// TODO: Handle duplicate input
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{/* First name */}
				<ScrollArea className='h-[500px]'>
					<div className='px-5'>
						<FormField
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem className='flex-grow'>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder='First Name'
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
						{/* Middle Name */}
						{/* <FormField
							control={form.control}
							name='middle_name'
							render={({ field }) => (
								<FormItem className='flex-grow'>
									<Label>Middle Name</Label>
									<FormControl>
										<Input
											placeholder='Middle Name(Optional)'
											{...field}
										/>
									</FormControl>

									<FormMessage></FormMessage>
								</FormItem>
							)}
						/> */}
						{/* Last Name */}
						<FormField
							control={form.control}
							name='last_name'
							render={({ field }) => (
								<FormItem className='flex-grow'>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Last Name'
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

						{/* Gender */}
						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<GenderSelect field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Date of Birth */}
						<FormField
							control={form.control}
							name='date_of_birth'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of Birth</FormLabel>
									<FormControl>
										<DatePickerPopover field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Phone Number */}
						<PhoneInput
							control={form.control}
							name='contact_number'
						/>
						{/* Email */}
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='flex-grow'>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Email Address (Optional)'
										/>
									</FormControl>
									<FormMessage></FormMessage>
								</FormItem>
							)}
						/>

						{/* Address */}
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem className='flex-grow'>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Address'
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</ScrollArea>
				<div className='pt-5'>
					<Button
						className='w-full'
						type='submit'
						disabled={form.formState.isSubmitting}
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default EditPatientForm
