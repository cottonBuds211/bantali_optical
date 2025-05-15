import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Info, Users, Database, ArrowRight, ChevronRight } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
const sidebarItems = [
	{
		id: 'user-management',
		label: 'Manage Users',
		icon: Users,
		to: 'users',
	},
	{
		id: 'archives',
		label: 'Archive',
		icon: Database,
		to: 'archives',
	},
	{
		id: 'logs',
		label: 'Audit Logs',
		icon: Database,
		to: 'logs',
	},
	{
		id: 'backup-restore',
		label: 'Backup & Restore',
		icon: Database,
		to: 'backup',
	},
]
const sideBarStaff = [
	{
		id: 'account',
		label: 'Account',
		icon: Users,
		to: 'account',
	},
	{
		id: 'archives',
		label: 'Archive',
		icon: Database,
		to: 'archives',
	},
]
const SettingsLayout = () => {
	const [activeItem, setActiveItem] = useState('')
	const { auth } = useAuth()
	const location = useLocation()
	const pathSegment = location.pathname.split('/')
	const lastSegment = pathSegment[pathSegment.length - 1]
	useEffect(() => {
		const arrayToFilter =
			auth.user.role === 'Admin' ? sidebarItems : sideBarStaff
		const activeItem = arrayToFilter.filter(item => item.to === lastSegment)
		setActiveItem(activeItem[0].id)
	}, [location])

	return (
		<div className='flex h-full'>
			<div className='w-64 border-r border-gray-200 dark:border-gray-700'>
				<div className='p-4'>
					<h1 className='text-2xl font-bold'>Settings</h1>
				</div>
				{auth.user.role === 'Admin' ? (
					<div className='space-y-2 text-sm p-2 ml-5 flex flex-col'>
						{sidebarItems.map(item => (
							<Link
								key={item.id}
								to={item.to}
								className={`w-full justify-start ${
									activeItem === item.id
										? 'font-bold text-primary'
										: ''
								}`}
								onClick={() => setActiveItem(item.id)}
							>
								{/* <item.icon className='mr-2 h-4 w-4' /> */}
								<div className='flex flex-row items-center transition-all duration-200'>
									{activeItem === item.id && (
										<span>
											<ChevronRight className='h-4 w-4' />
										</span>
									)}
									{item.label}
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className='space-y-2 text-sm p-2 ml-5 flex flex-col'>
						{sideBarStaff.map(item => (
							<Link
								key={item.id}
								to={item.to}
								className={`w-full justify-start ${
									activeItem === item.id
										? 'font-bold text-primary'
										: ''
								}`}
								onClick={() => setActiveItem(item.id)}
							>
								{/* <item.icon className='mr-2 h-4 w-4' /> */}
								<div className='flex flex-row items-center transition-all duration-200'>
									{activeItem === item.id && (
										<span>
											<ChevronRight className='h-4 w-4' />
										</span>
									)}
									{item.label}
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
			<div className='flex-1 overflow-auto'>
				<div className=' mx-auto py-8 px-4 sm:px-6 lg:px-8'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default SettingsLayout
