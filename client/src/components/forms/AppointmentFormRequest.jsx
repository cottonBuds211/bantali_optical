import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { format, setHours, setMinutes } from 'date-fns'
import AppointmentDatePicker from '@/components/appointmentDatePicker'
import { useForm } from 'react-hook-form'
import requestFormSchema from '../zodSchema/requestFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import AppointmentServices from '@/services/appointmentServices'
import utils from '@/utils/helper'
import { useState, useEffect } from 'react'
import { useToast } from '../ui/use-toast'
import { PhoneInput } from '../PhoneInput'
import { useNotification } from '@/context/NotificationContext'
import { Separator } from '../ui/separator'
const generateTimeSlots = () => {
	const slots = []
	for (let hour = 9; hour < 16; hour++) {
		if (hour === 12) continue
		const time = setMinutes(setHours(new Date(), hour), 0)
		slots.push(format(time, 'hh:mm a'))
	}
	return slots
}

const AppointmentFormRequest = ({ setIsDialogOpen, setRefresh }) => {
	const { toast } = useToast()
	const appointmentServices = new AppointmentServices()
	const timeSlots = generateTimeSlots()
	const [unavailableSlots, setUnavailableSlots] = useState([''])
	const requestForm = useForm({
		resolver: zodResolver(requestFormSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			appointment_time_start: '',
			appointment_date: null,
		},
	})

	const appointmentDate = requestForm.watch('appointment_date')

	//console.log(unavailableSlots)
	useEffect(() => {
		if (appointmentDate) {
			// Fetch the unavailable slots for the selected date
			const fetchUnavailableSlots = async date => {
				//console.log(appointmentDate)
				try {
					const result =
						await appointmentServices.getUnavailableSlots(
							encodeURIComponent(date)
						)

					//console.log(result)
					if (result.length >= 1) {
						setUnavailableSlots(
							result.map(appointment =>
								new Date(appointment).toLocaleTimeString(
									'en-US',
									{
										hour12: true,
										hour: '2-digit',
										minute: 'numeric',
									}
								)
							)
						)
					} else {
						setUnavailableSlots([])
					}
					// Set booked slots
				} catch (error) {
					console.error('Error fetching booked slots:', error)
				}
			}

			fetchUnavailableSlots(appointmentDate)
			//console.log(unavailableSlots)
		}
	}, [appointmentDate])

	const handleSubmit = async () => {
		const requestData = requestForm.getValues()
		//console.log(requestData)

		const { appointment_date, appointment_time_start } = requestData

		const combinedDateTime = utils.combineDateAndTime(
			appointment_date,
			appointment_time_start
		)

		const finalRequestData = {
			...requestData,
			appointment_time_start: combinedDateTime.toISOString(), // Send datetime in ISO format
		}

		try {
			const appointment = await appointmentServices.addAppointments(
				finalRequestData
			)
			requestForm.reset()
			setUnavailableSlots([])
			toast({
				title: 'Success',
				description: `Appointment made`,
				duration: 3000,
			})
			setRefresh && setRefresh(true)
			setIsDialogOpen && setIsDialogOpen(false)
			//console.log('request', appointment)
		} catch (error) {
			console.error(error.status)
			if (error.status === 409) {
				toast({
					title: 'Appointment Request Failed',
					variant: 'destructive',
					description:
						'Already has pending appointment for that day!',
					duration: 3000,
				})
			} else {
				toast({
					title: 'Error',
					variant: 'destructive',
					description: error.message,
					duration: 3000,
				})
			}
		}
	}

	return (
		<Form {...requestForm}>
			<form onSubmit={requestForm.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-10 w-full py-3 px-4 '>
					{/* <p className='font-bold'>Personal Information:</p> */}
					<div className=''>
						<div
							className={`grid lg:grid-cols-2 grid-cols-1 gap-x-5 gap-y-2`}
						>
							<FormItem>
								<FormLabel>First Name *</FormLabel>
								<FormField
									control={requestForm.control}
									name='first_name'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className=' p-5 placeholder-slate-400 '
													placeholder='First Name'
													{...field}
													onChange={e => {
														const value =
															e.target.value
														if (
															/^[A-Za-z ]*$/.test(
																value
															)
														) {
															field.onChange(
																value
															) // Only update if input is valid
														}
													}}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</FormItem>
							<FormItem>
								<FormLabel>Last Name *</FormLabel>
								<FormField
									control={requestForm.control}
									name='last_name'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className=' p-5 placeholder-slate-400'
													placeholder='Last Name'
													{...field}
													onChange={e => {
														const value =
															e.target.value
														if (
															/^[A-Za-z ]*$/.test(
																value
															)
														) {
															field.onChange(
																value
															) // Only update if input is valid
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormItem>
							{/* <FormItem>
							<FormLabel>Phone</FormLabel>
							<FormField
								control={requestForm.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='p-5 placeholder-slate-400'
												placeholder='Contact Number'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormItem> */}
						</div>
						<div>
							<PhoneInput
								control={requestForm.control}
								name={'phone'}
							/>
							<FormItem>
								<FormLabel>Email *</FormLabel>
								<FormField
									control={requestForm.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className=' p-5 placeholder-slate-400'
													placeholder='Enter your e-mail (optional)'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Email is required to notify you
												about the state of your
												appointment.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormItem>
						</div>
					</div>
					{/* <p className='font-bold'>Appointment Details:</p> */}
					<div className='grid gap-x-5 gap-y-7'>
						<FormItem className='w-fit'>
							<FormLabel>Appointment Date *</FormLabel>
							<FormField
								control={requestForm.control}
								name='appointment_date'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<AppointmentDatePicker
												field={field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormItem>
						<FormItem>
							<FormLabel>Appointment Time *</FormLabel>
							<FormField
								control={requestForm.control}
								name='appointment_time_start'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex items-center space-x-2'>
												<div className='flex-1 grid grid-cols-3 gap-2'>
													{timeSlots.map(slot => {
														const isUnavailable =
															unavailableSlots.includes(
																slot
															)
														return (
															<Button
																key={slot}
																type='button'
																variant='outline'
																className={`${
																	isUnavailable
																		? 'opacity-50 text-red-500  border-red-500 '
																		: ''
																} focus:font-bold focus:text-primary focus:border-2 focus:border-primary/50 relative `}
																onClick={() => {
																	if (
																		!isUnavailable
																	) {
																		field.onChange(
																			slot
																		)
																	}
																}}
																disabled={
																	isUnavailable
																}
																aria-label={
																	isUnavailable
																		? `Slot ${slot} is unavailable`
																		: `Select slot ${slot}`
																}
															>
																{/* Diagonal slash overlay */}
																{isUnavailable ? (
																	<span>
																		Unavailable
																	</span>
																) : (
																	<span>
																		{slot}
																	</span>
																)}
															</Button>
														)
													})}
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormItem>
					</div>
				</div>
				<div className='flex justify-end px-4'>
					<Button className=' w-full lg:w-56  ' type='submit'>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default AppointmentFormRequest
