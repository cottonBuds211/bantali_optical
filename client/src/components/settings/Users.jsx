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
import {
	MoreHorizontal,
	ArrowUpDown,
	Edit2,
	Trash2,
	LockKeyhole,
	ArchiveX,
} from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import UserServices from '@/services/usersServices'
import AddUserButton from '../forms/AddUserButton'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import ChangeUserPasswordForm from '../forms/ChangeUserPasswordForm'
import { useToast } from '../ui/use-toast'
import { Badge } from '../ui/badge'
import EditUserForm from '../forms/EditUserForm'
const Users = () => {
	const [passwordDialog, setChangePasswordDialog] = useState(false)
	const [editUserDialog, setEditUserDialog] = useState(false)
	const userServices = new UserServices()
	const [userId, setUserId] = useState()
	const [user, setUser] = useState()
	const [users, setUsers] = useState([])
	const [sortColumn, setSortColumn] = useState('name')
	const [sortDirection, setSortDirection] = useState('desc' > 'asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [refresh, setRefresh] = useState()
	const toast = useToast()
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
			setRefresh(false)
			isMounted = false
			controller.abort()
		}
	}, [refresh])

	const handleDeactivate = async id => {
		try {
			const deactivate = await userServices.deactivateUser(id)
			setRefresh(true)
			toast({
				title: 'Success',
				description: `${deactivate.name} account deactivated!`,
				duration: 3000,
			})
		} catch (error) {
			toast({
				title: 'Failed',
				variant: 'destructive',
				description: `Action failed something went wrong!`,
				duration: 3000,
			})
		}
	}
	const handleActivate = async id => {
		try {
			const deactivate = await userServices.activateUser(id)
			setRefresh(true)
			toast({
				title: 'Success',
				description: `${deactivate.name} account activated`,
				duration: 3000,
			})
		} catch (error) {
			toast({
				title: 'Failed',
				variant: 'destructive',
				description: `Action failed something went wrong!`,
				duration: 3000,
			})
		}
	}

	return (
		<PageWrapper title={'Users'}>
			<div className='flex  justify-between items-center'>
				<Input
					placeholder='Search users...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='max-w-sm mb-4'
				/>
				<AddUserButton setRefresh={setRefresh} />
			</div>
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
								{user.active === false ? (
									<Badge className='ml-2 bg-red-500'>
										Deactivated
									</Badge>
								) : null}
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
										{user.active === true ? (
											<DropdownMenuItem
												className='flex items-center'
												onSelect={() => {
													setEditUserDialog(true)
													setUser(user)
												}}
											>
												<Edit2 className='mr-2 h-4 w-4' />
												Edit User
											</DropdownMenuItem>
										) : null}
										<DropdownMenuItem
											onSelect={() => {
												setChangePasswordDialog(true)
												setUserId(user.user_id)
											}}
											className='flex items-center'
										>
											<LockKeyhole className='mr-2 h-4 w-4' />
											Change Password
										</DropdownMenuItem>
										{user.role === 'Staff' ? (
											user.active === true ? (
												<DropdownMenuItem
													onSelect={() => {
														handleDeactivate(
															user.user_id
														)
													}}
													className='flex items-center text-red-500'
												>
													<ArchiveX className='mr-2 h-4 w-4' />
													Deactivate Account
												</DropdownMenuItem>
											) : (
												<DropdownMenuItem
													onSelect={() => {
														handleActivate(
															user.user_id
														)
													}}
													className='flex items-center '
												>
													<ArchiveX className='mr-2 h-4 w-4' />
													Activate Account{' '}
												</DropdownMenuItem>
											)
										) : null}
										{user.active === false ? (
											<DropdownMenuItem
												onSelect={() => {
													handleDeactivate(
														user.user_id
													)
												}}
												className='flex items-center text-red-500'
											>
												<ArchiveX className='mr-2 h-4 w-4' />
												Delete Account
											</DropdownMenuItem>
										) : null}
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Dialog
				open={passwordDialog}
				onOpenChange={setChangePasswordDialog}
			>
				<DialogContent className='w-11/12 sm:max-w-xl p-12'>
					<DialogHeader>
						<DialogTitle>Add New User</DialogTitle>
						<DialogDescription>
							Enter the details of the new user below. Click save
							when you're done.
						</DialogDescription>
					</DialogHeader>
					<ChangeUserPasswordForm
						setRefresh={setRefresh}
						setChangePasswordDialog={setChangePasswordDialog}
						userId={userId}
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
				<DialogContent className='w-11/12 sm:max-w-xl p-12'>
					<DialogHeader>
						<DialogTitle>Edit User</DialogTitle>
						<DialogDescription>
							Enter the details of the new user below. Click save
							when you're done.
						</DialogDescription>
					</DialogHeader>
					<EditUserForm
						setRefresh={setRefresh}
						setEditUserDialog={setEditUserDialog}
						user={user}
					/>
				</DialogContent>
			</Dialog>
		</PageWrapper>
	)
}

export default Users
