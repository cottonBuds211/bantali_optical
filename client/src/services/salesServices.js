import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function SalesServices() {
	const axiosPrivate = useAxiosPrivate()

	const createSale = async data => {
		const response = await axiosPrivate.post(`/sales/`, data)
		return response.data
	}
	const getAllSales = async signal => {
		const response = await axiosPrivate.get(`/sales/`, signal)
		return response.data
	}
	return {
		createSale,
		getAllSales,
	}
}

export default SalesServices
