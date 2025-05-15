import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { format, setHours, setMinutes } from 'date-fns'
import AppointmentDatePicker from '@/components/appointmentDatePicker'
import { useForm } from 'react-hook-form'
import requestFormSchema from '../zodSchema/requestFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import AppointmentServices from '@/services/appointmentServices'
import utils from '@/utils/helper'
import { useState, useEffect } from 'react'
import { useToast } from '../ui/use-toast'
import useAuth from '@/hooks/useAuth'
const generateTimeSlots = () => {
	const slots = []
	for (let hour = 9; hour < 16; hour++) {
		if (hour === 12) continue
		const time = setMinutes(setHours(new Date(), hour), 0)
		slots.push(format(time, 'hh:mm a'))
	}
	return slots
}

const EditAppointmentForm = ({ setRefresh, setEdit, appointment }) => {
	//console.log(appointment)
	const { auth } = useAuth()
	const { toast } = useToast()
	const appointmentServices = new AppointmentServices()
	const timeSlots = generateTimeSlots()
	const [unavailableSlots, setUnavailableSlots] = useState([''])
	const requestForm = useForm({
		resolver: zodResolver(requestFormSchema),
		defaultValues: {
			first_name: appointment.first_name,
			last_name: appointment.last_name,
			email: appointment.email,
			phone: appointment.phone,
			appointment_time_start: appointment.appointment_time_start,
			appointment_date: new Date(appointment.appointment_date),
		},
	})
	//console.log('appointment:', appointment)

	const appointmentDate = requestForm.watch('appointment_date')

	//console.log(unavailableSlots)
	useEffect(() => {
		if (appointmentDate) {
			// Fetch the unavailable slots for the selected date
			const fetchUnavailableSlots = async date => {
				console.log(appointmentDate)
				try {
					const result =
						await appointmentServices.getUnavailableSlots(
							encodeURIComponent(date)
						)

					console.log(result)
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
			console.log(unavailableSlots)
		}
	}, [appointmentDate])

	const handleSubmit = async () => {
		const requestData = requestForm.getValues()
		console.log(requestData)
		const { appointment_date, appointment_time_start } = requestData

		const combinedDateTime = utils.combineDateAndTime(
			appointment_date,
			appointment_time_start
		)

		const finalRequestData = {
			...requestData,
			appointment_time_start: combinedDateTime.toISOString(), // Send datetime in ISO format
			user_id: auth.user.user_id,
		}
		console.log('final', finalRequestData)
		try {
			const updatedAppointment =
				await appointmentServices.updateAppointment(
					appointment.appointment_id,
					finalRequestData
				)
			requestForm.reset({})

			toast({
				title: 'Success',
				description: `Appointment rescheduled`,
				duration: 3000,
			})
			setRefresh && setRefresh(true)
			setEdit && setEdit(false)
			console.log('updated', updatedAppointment)
		} catch (error) {
			console.error(error)
			toast({
				title: 'Error',
				variant: 'destructive',
				description: `Appointment conflict`,
				duration: 3000,
			})
		}
	}

	return (
		<Form {...requestForm}>
			<form onSubmit={requestForm.handleSubmit(handleSubmit)}>
				<div className=' w-full py-3 px-4 space-y-2'>
					<div className='grid  gap-x-5 gap-y-7'>
						<FormItem className='w-1/3'>
							<FormLabel>Appointment Date</FormLabel>
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
							<FormLabel>Appointment Time</FormLabel>
							<FormField
								control={requestForm.control}
								name='appointment_time_start'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex items-center space-x-2'>
												<div className='flex-1 grid grid-cols-3 gap-2'>
													{timeSlots.map(slot => (
														<Button
															key={slot}
															type='button'
															variant='outline'
															className={` ${
																unavailableSlots.includes(
																	slot
																)
																	? 'opacity-50 cursor-not-allowed'
																	: ''
															} 
												
													bg-transparent focus:font-bold focus:border-2 `}
															onClick={() =>
																field.onChange(
																	slot
																)
															}
															disabled={unavailableSlots.includes(
																slot
															)}
														>
															{slot}
														</Button>
													))}
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
					<Button
						className=' w-full lg:w-56  '
						onClick={handleSubmit}
					>
						Reschedule
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default EditAppointmentForm
