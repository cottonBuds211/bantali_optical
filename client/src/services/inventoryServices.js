import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function InventoryServices() {
	const axiosPrivate = useAxiosPrivate()

	const getAllInventory = async signal => {
		const response = await axiosPrivate.get('/inventory/', { signal })
		return response.data
	}
	const getInventory = async (item_id, signal) => {
		const response = await axiosPrivate.get(`/inventory/${item_id}`, {
			signal,
		})
		return response.data
	}

	const addInventory = async data => {
		const response = await axiosPrivate.post('/inventory/', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	}
	const deleteInventory = async (item_id, userId) => {
		const response = await axiosPrivate.delete(
			`/inventory/${item_id}/${userId}`
		)
		return response.data
	}

	const updateInventory = async (item_id, data) => {
		const response = await axiosPrivate.put(`/inventory/${item_id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	}

	return {
		getAllInventory,
		addInventory,
		getInventory,
		deleteInventory,
		updateInventory,
	}
}
export default InventoryServices
