import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import axios from '@/api/axios'

function AppointmentServices() {
	const axiosPrivate = useAxiosPrivate()
	const getAcceptedAppointments = async signal => {
		const response = await axiosPrivate.get(
			`/appointments/accepted`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}

	const getPendingAppointments = async ({ signal }) => {
		const response = await axiosPrivate.get(
			`/appointments/pending`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}

	const getHistoryAppointments = async (signal, limit) => {
		const response = await axiosPrivate.get(
			`/appointments/history?limit=${limit}`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}

	const getRejectedAppointments = async signal => {
		const response = await axiosPrivate.get(
			`/appointments/rejected`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}
	// const editAppointments = async (id, data) => {
	// 	const response = await axiosPrivate.put(`/appointments/${id}`, data, {
	// 		withCredentials: true,
	// 	})
	// 	return response.data
	// }
	const getAppointment = async id => {
		const response = await axiosPrivate.get(`/appointments/${id}`, {
			withCredentials: true,
		})
		return response.data
	}

	const addAppointments = async data => {
		const response = await axios.post(`/appointments/`, data)
		return response.data
	}
	const updateAppointment = async (appointmentId, data) => {
		const response = await axiosPrivate.put(
			`/appointments/${appointmentId}`,
			data
		)
		return response.data
	}

	const getUnavailableSlots = async date => {
		const response = await axios.get(
			`/appointments/unavailable-slot?date=${date}`
		)
		return response.data
	}

	const acceptAppointment = async (id, user_id) => {
		const response = await axiosPrivate.put(
			`/appointments/accept/${id}`,
			{ user_id },
			{
				withCredentials: true,
			}
		)
		return response.data
	}

	const rejectAppointment = async (id, user_id, reason_for_rejection) => {
		const response = await axiosPrivate.put(
			`/appointments/reject/${id}`,
			{ user_id, reason_for_rejection },
			{
				withCredentials: true,
			}
		)
		return response.data
	}

	const markAsComplete = async (id, user_id) => {
		const response = await axiosPrivate.put(
			`/appointments/mark-as-complete/${id}`,
			{ user_id },
			{ withCredentials: true }
		)
		return response.data
	}
	const markAsPending = async (id, user_id) => {
		const response = await axiosPrivate.put(
			`/appointments/mark-as-pending/${id}`,
			{ user_id },
			{ withCredentials: true }
		)
		return response.data
	}

	const markAsCancelled = async (id, user_id) => {
		const response = await axiosPrivate.put(
			`/appointments/mark-as-cancelled/${id}`,
			{ user_id },
			{ withCredentials: true }
		)
		return response.data
	}
	const markAsMissed = async id => {
		const response = await axiosPrivate.put(
			`/appointments/mark-as-missed/${id}`,
			{ withCredentials: true }
		)
		return response.data
	}

	const archiveAppointment = async (id, user_id) => {
		const response = await axiosPrivate.put(
			`/appointments/archive/${id}`,
			{ user_id },
			{
				withCredentials: true,
			}
		)
		return response.data
	}

	return {
		acceptAppointment,
		rejectAppointment,
		getAcceptedAppointments,
		getPendingAppointments,
		getAppointment,
		addAppointments,
		getHistoryAppointments,
		markAsComplete,
		getUnavailableSlots,
		updateAppointment,
		archiveAppointment,
		markAsPending,
		getRejectedAppointments,
		markAsCancelled,
		markAsMissed,
	}
}

export default AppointmentServices
