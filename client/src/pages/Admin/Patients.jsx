import { useEffect, useState } from 'react'
import PaginationPage from '@/components/PaginationPage'
import PatientServices from '@/services/patientServices'
import PatientCard from '@/components/patients/PatientCard'
import PageWrapper from '@/components/PageWrapper'
import { PlusIcon, UserX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

// Default values shown
const Patients = () => {
	const auth = useAuth()
	const { toast } = useToast()
	const patientServices = new PatientServices()
	const [patients, setPatients] = useState([])
	const navigate = useNavigate()
	const location = useLocation()
	const [filteredPatients, setFilteredPatients] = useState([]) // Filtered data
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const postPerPage = 12

	const lastPostIndex = currentPage * postPerPage
	const firstPostIndex = lastPostIndex - postPerPage
	const currentPosts = filteredPatients?.slice(firstPostIndex, lastPostIndex)
	const [isLoading, setLoading] = useState(true)
	console.log(currentPosts.length > 12)
	//Get all patients
	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getPatients = async () => {
			try {
				const initialPatients = await patientServices.getAllPatients(
					signal
				)

				initialPatients.sort((a, b) =>
					b.updatedAt.localeCompare(a.updatedAt)
				)

				setPatients(initialPatients)
			} catch (err) {
				console.error(err)
				if (err.code !== 'ERR_CANCELED') {
					toast({
						title: 'Session Expired',
						description:
							'Your session has expired please log-in again!',
					})
					navigate('/', {
						state: { from: location },
						replace: true,
					})
				}
			} finally {
				setLoading(false)
			}
		}
		getPatients()

		return () => {
			controller.abort()
		}
	}, [auth])

	//Filter patients
	useEffect(() => {
		if (searchTerm) {
			const filteredData = patients.filter(patient => {
				const searchTextLower = searchTerm.toLowerCase()
				const fullNameLower =
					`${patient.first_name} ${patient.last_name}`.toLowerCase()
				return fullNameLower.includes(searchTextLower)
			})
			setFilteredPatients(filteredData)
		} else {
			setFilteredPatients(patients)
		}
	}, [searchTerm, patients])

	const handleSearchChange = event => {
		setSearchTerm(event.target.value)
		setCurrentPage(1)
	}

	return (
		<>
			<PageWrapper title={'Patients'}>
				<div className='flex justify-between items-center mb-4'>
					<div>
						<div className='flex  h-10  items-center border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2'>
							<SearchIcon className='h-[16px] w-[16px]' />
							<Input
								name='search'
								placeholder='Search Patients'
								className='w-[400px] p-2 placeholder:text-muted-foreground  border-0 ring-offset-background focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 bg-transparent'
								autocomplete='off'
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<div className='flex flex-row gap-2'>
							<p className='text-sm font-semibold '>
								Total Patients
							</p>
							<p className='text-sm text-muted-foreground font-semibold'>
								{patients.length}
							</p>
						</div>
						<div>
							<Link to={`add`}>
								<Button>
									<PlusIcon className='mr-2 h-4 w-4' />
									<p>Add Patient</p>
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-between '>
					{/* Limit the data based on the currentPost var */}
					{/* Client side pagination */}
					{!isLoading ? (
						currentPosts.length > 0 ? (
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5'>
								{currentPosts?.map((patient, index) => (
									<PatientCard
										key={index}
										patient={patient}
									/>
								))}
							</div>
						) : (
							<div className='flex flex-col items-center mt-20 text-muted-foreground'>
								<UserX size={90} strokeWidth={1} />
								<p>No Patients in the database</p>
							</div>
						)
					) : (
						<div className='h-[200px] flex  justify-center items-center'>
							<l-ring
								size='40'
								stroke='5'
								bg-opacity='0'
								speed='2'
								color='gray'
							></l-ring>
						</div>
					)}
					<div>
						{!isLoading && currentPosts.length > 0 ? (
							filteredPatients.length > 12 ? (
								<PaginationPage
									totalPosts={filteredPatients?.length}
									postPerPage={postPerPage}
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
								/>
							) : null
						) : null}
					</div>
				</div>
			</PageWrapper>
		</>
	)
}

export default Patients
