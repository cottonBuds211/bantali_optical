import { parse, setHours, setMinutes } from 'date-fns'

const getAge = date => {
	const today = new Date()
	const birthYear = new Date(date).getFullYear()
	let age = today.getFullYear() - birthYear

	// Optional: Account for birthdays not yet passed in the current year
	const birthMonth = new Date(date).getMonth()
	const currentMonth = today.getMonth()
	if (
		currentMonth < birthMonth ||
		(currentMonth === birthMonth &&
			today.getDate() < new Date(date).getDate())
	) {
		age--
	}

	return age
}

const combineDateAndTime = (appointment_date, appointment_time_start) => {
	// Parse the appointment date (ensure no time is present)
	const datePart = new Date(appointment_date)

	// Parse the appointment time (12-hour format, e.g., "09:00 AM")
	const parsedTime = parse(appointment_time_start, 'hh:mm a', new Date())

	// Set the hours and minutes of the parsed time to the date part
	const combinedDateTime = setHours(
		setMinutes(datePart, parsedTime.getMinutes()),
		parsedTime.getHours()
	)

	return combinedDateTime
}

export default {
	getAge,
	combineDateAndTime,
}
