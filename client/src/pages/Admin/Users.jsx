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
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import PageWrapper from '@/components/patientWrapper'
import UserServices from '@/services/usersServices'

// Sample user data
const initialUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
	{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
	{
		id: 5,
		name: 'Charlie Davis',
		email: 'charlie@example.com',
		role: 'User',
	},
]

const Users = () => {
	const userServices = new UserServices()
	const [users, setUsers] = useState([])
	const [sortColumn, setSortColumn] = useState('name')
	const [sortDirection, setSortDirection] = useState('desc' > 'asc')
	const [searchTerm, setSearchTerm] = useState('')
	const handleSort = column => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}

	const sortedUsers = [...users].sort((a, b) => {
		if (a[sortColumn] < b[sortColumn])
			return sortDirection === 'asc' ? -1 : 1
		if (a[sortColumn] > b[sortColumn])
			return sortDirection === 'asc' ? 1 : -1
		return 0
	})

	const filteredUsers = sortedUsers.filter(
		user =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase())
	)

	console.log(users)

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getUsers = async () => {
			try {
				const initialUsers = await userServices.getAllUsers(signal)
				isMounted && setUsers(initialUsers)
			} catch (error) {
				console.error(error)
			}
		}
		getUsers()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])

	const handleDelete = id => {
		setUsers(users.filter(user => user.id !== id))
	}

	return (
		<PageWrapper title={'Users'}>
			<Input
				placeholder='Search users...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='max-w-sm mb-4'
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							onClick={() => handleSort('name')}
							className='cursor-pointer'
						>
							Name <ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead
							onClick={() => handleSort('email')}
							className='cursor-pointer'
						>
							Email{' '}
							<ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead
							onClick={() => handleSort('role')}
							className='cursor-pointer'
						>
							Role <ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredUsers.map(user => (
						<TableRow key={user.id}>
							<TableCell className='font-medium'>
								{user.name}
							</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
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
										<DropdownMenuLabel>
											Actions
										</DropdownMenuLabel>
										<DropdownMenuItem
											onClick={() =>
												navigator.clipboard.writeText(
													user.email
												)
											}
										>
											Copy email
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											Edit user
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleDelete(user.id)
											}
										>
											Delete user
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</PageWrapper>
	)
}

export default Users
