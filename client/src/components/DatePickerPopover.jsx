import { cn } from '@/lib/utils'
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
import { useState } from 'react'
const DatePickerPopover = ({ field }) => {
	const [calendarOpen, setCalendarOpen] = useState(false)

	const dateNow = new Date()
	dateNow.setFullYear(dateNow.getFullYear() - 1)
	return (
		<Popover
			open={calendarOpen}
			onOpenChange={setCalendarOpen}
			modal={true}
		>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'sm:w-[100%] lg:w-[100%] pl-3 text-left font-normal',
						!field.value && 'text-muted-foreground'
					)}
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
					fromYear={1950}
					toYear={dateNow.getFullYear()}
					selected={field.value}
					onSelect={value => {
						field.onChange(value)
						setCalendarOpen(false)
					}}
					defaultValue={field.value}
					disabled={date =>
						date > dateNow || date < new Date('1900-01-01')
					}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePickerPopover
