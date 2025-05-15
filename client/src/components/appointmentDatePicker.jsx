import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
const AppointmentDatePicker = ({ field }) => {
	const [calendarOpen, setCalendarOpen] = useState(false)

	const [dateNow, setDateNow] = useState(new Date())
	// useEffect(() => {
	// 	async function getCurrentUTCTime() {
	// 		try {
	// 			const response = await fetch(
	// 				'http://worldtimeapi.org/api/timezone/Asia/Manila'
	// 			)
	// 			const data = await response.json()
	// 			const utcDate = new Date(data.utc_datetime)
	// 			console.log(data.utc_datetime)
	// 			//console.log('UTC Date and Time:', utcDate)

	// 			setDateNow(utcDate)
	// 		} catch (error) {
	// 			console.error('Error fetching UTC time:', error)
	// 			return null
	// 		}
	// 	}
	// 	getCurrentUTCTime()
	// 	console.log('date', dateNow)
	// }, [])
	const tenDaysLater = new Date()
	tenDaysLater.setDate(dateNow.getDate() + 10)

	const isWeekend = date => {
		const dayOfWeek = date.getDay() // 0 is Sunday, 6 is Saturday
		return dayOfWeek === 0 || dayOfWeek === 6
	}
	return (
		<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className={`
						sm:w-[100%] bg-transparent lg:w-[100%] pl-3 text-left text-primary/90 font-normal  p-5 ${
							!field.value && `text-slate-400`
						}`}
				>
					<CalendarIcon className='mr-2 h-4 w-4 opacity-50' />
					{field.value ? (
						format(field.value, 'PPP')
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='left '>
				<Calendar
					mode='single'
					captionLayout='dropdown-buttons'
					fromYear={dateNow?.getFullYear()}
					toYear={dateNow?.getFullYear() + 1}
					selected={field.value}
					onSelect={value => {
						field.onChange(value)
						setCalendarOpen(false)
					}}
					defaultValue={field.value}
					disabled={date =>
						date < dateNow || date > tenDaysLater || isWeekend(date)
					}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default AppointmentDatePicker
