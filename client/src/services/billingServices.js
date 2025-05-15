import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function BillingServices() {
	const axiosPrivate = useAxiosPrivate()

	const getAllBillings = async signal => {
		const response = await axiosPrivate.get(
			`/billings/`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}
	const getLatestBilling = async (patient_id, signal) => {
		const response = await axiosPrivate.get(
			`/billings/latest/${patient_id}`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}

	const getBilling = async (billing_id, signal) => {
		const response = await axiosPrivate.get(
			`/billings/billing/${billing_id}`,
			{
				withCredentials: true,
			},
			{ signal }
		)
		return response.data
	}

	const getAllBillingsForPatient = async patient_id => {
		const response = await axiosPrivate.get(`/billings/${patient_id}`, {
			withCredentials: true,
		})
		return response.data
	}

	const markBillingAsPaid = async (billing_id, user_id) => {
		const response = await axiosPrivate.put(
			`/billings/mark-as-paid/${billing_id}`,
			{ user_id },
			{
				withCredentials: true,
			}
		)
		return response.data
	}

	const addBilling = async data => {
		const response = await axiosPrivate.post(`/billings/`, data)
		return response.data
	}

	return {
		getAllBillingsForPatient,
		addBilling,
		getAllBillings,
		getLatestBilling,
		markBillingAsPaid,
		getBilling,
	}
}

export default BillingServices
