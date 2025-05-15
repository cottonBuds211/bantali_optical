import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function LogServices() {
	const axiosPrivate = useAxiosPrivate()

	const getLogs = async signal => {
		const response = await axiosPrivate.get('/logs/', { signal })
		return response.data
	}
	return {
		getLogs,
	}
}
export default LogServices
