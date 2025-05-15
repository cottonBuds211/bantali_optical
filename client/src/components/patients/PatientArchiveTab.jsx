import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	ArchiveIcon,
	ArchiveRestoreIcon,
	ArrowUpDown,
	MoreHorizontal,
	Trash2,
} from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import PatientServices from '@/services/patientServices'
import { useToast } from '../ui/use-toast'
import { ConfirmationDialog } from '../ConfirmationDialog'
import useAuth from '@/hooks/useAuth'

const PatientArchiveTab = () => {
	const { auth } = useAuth()
	const patientServices = new PatientServices()
	const [onDelete, setOnDelete] = useState()
	const [refresh, setRefresh] = useState()
	const [patients, setPatients] = useState([])
	const [sortColumn, setSortColumn] = useState('name')
	const [sortDirection, setSortDirection] = useState('desc' > 'asc')
	const [searchTerm, setSearchTerm] = useState('')
	const { toast } = useToast()
	const handleSort = column => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}
	//console.log('user', auth.user.user_id)
	const sortedPatients = [...patients].sort((a, b) => {
		if (a[sortColumn] < b[sortColumn])
			return sortDirection === 'asc' ? -1 : 1
		if (a[sortColumn] > b[sortColumn])
			return sortDirection === 'asc' ? 1 : -1
		return 0
	})

	const filteredPatients = sortedPatients.filter(
		patient =>
			patient.first_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			patient.last_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			patient.email.toLowerCase().includes(searchTerm.toLowerCase())
	)

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getUsers = async () => {
			try {
				const patients = await patientServices.getArchivedPatients(
					signal
				)
				isMounted && setPatients(patients)
			} catch (error) {
				console.error(error)
			}
		}
		getUsers()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [refresh])

	const handleUnArchive = patient_id => {
		const unArchivePatient = async () => {
			try {
				const patients = await patientServices.editPatient(
					{
						active: true,
						user_id: auth.user.user_id,
					},
					patient_id
				)
				toast({
					title: 'Success',
					description: 'Patient was unarchived!',
				})
				setRefresh(true)
			} catch (error) {
				console.error(error)
				setRefresh(false)
			}
		}
		unArchivePatient()
	}

	const handleDelete = patient_id => {
		const deletePatient = async () => {
			try {
				const patients = await patientServices.deletePatient(
					patient_id,
					auth.user.user_id
				)
				toast({
					title: 'Success',
					description: 'Patient was deleted successfully!',
				})
				setRefresh(true)
			} catch (error) {
				console.error(error)
				setRefresh(false)
			}
		}
		deletePatient()
	}

	return (
		<>
			<Input
				placeholder='Search archive...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='max-w-sm mb-4'
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							onClick={() => handleSort('first_name')}
							className='cursor-pointer'
						>
							Name <ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead
							onClick={() => handleSort('contact_number')}
							className='cursor-pointer'
						>
							Contact Number{' '}
							<ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead
							onClick={() => handleSort('email')}
							className='cursor-pointer'
						>
							Email{' '}
							<ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead>Date Archived</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredPatients.map(patient => (
						<TableRow key={patient.patient_id}>
							<TableCell className='font-medium'>
								{patient.first_name} {patient.last_name}
							</TableCell>
							<TableCell>{patient.contact_number}</TableCell>
							<TableCell>
								{' '}
								{patient.email
									? patient.email
									: 'No email provided'}
							</TableCell>
							<TableCell>
								{new Date(patient.updatedAt).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'short',
										day: 'numeric',
									}
								)}
							</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant='ghost'
											className='h-8 w-8 p-0'
										>
											<span className='sr-only'>
												Open menu
											</span>
											<MoreHorizontal className='h-4 w-4' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuItem
											onClick={() =>
												handleUnArchive(
													patient.patient_id
												)
											}
										>
											<ArchiveRestoreIcon className='mr-2 h-4 w-4' />
											Restore
										</DropdownMenuItem>
										{/* <DropdownMenuItem
											onClick={() => setOnDelete(true)}
											className='flex items-center text-red-600 focus:text-red-600 focus:bg-red-100'
										>
											<Trash2 className='mr-2 h-4 w-4' />
											Delete User
										</DropdownMenuItem> */}
									</DropdownMenuContent>
								</DropdownMenu>
								<ConfirmationDialog
									title='Delete Patient'
									description='Are you sure you want to delete this patient? This will delete all data associated with it.'
									confirmText='Delete'
									onConfirm={() =>
										handleDelete(patient.patient_id)
									}
									open={onDelete}
									setOpen={setOnDelete}
									destructive={true}
								></ConfirmationDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default PatientArchiveTab
