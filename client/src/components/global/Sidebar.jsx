import { useState, useEffect } from 'react'
import {
	LayoutDashboardIcon,
	LucideUserRound,
	EyeIcon,
	Calendar,
	ClipboardList,
	PieChart,
	Settings,
	HelpCircleIcon,
} from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import NavItem from '@/components/navItem'
import { Button } from '../ui/button'
import { useSidebar } from '@/context/SideBarContext'
import useAuth from '@/hooks/useAuth'

const Sidebar = () => {
	const { sidebarOpen, setSidebarOpen } = useSidebar()
	const [isHovered, setIsHovered] = useState(false)
	const { auth } = useAuth()
	return (
		<div
			className={`sticky left-0 backdrop-blur-sm font-inter top-0 h-screen hidden lg:flex md:flex flex-col justify-between p-1 border-r transition-all delay-150 duration-300 z-40 overflow-hidden  ${
				!sidebarOpen ? (isHovered ? 'w-64' : 'w-20') : 'w-64'
			} `}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div>
				<div className='p-4 flex justify-between items-center'>
					<div onClick={() => setSidebarOpen(!sidebarOpen)}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='ghost' size='icon'>
									<EyeIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='right'>
								<p>Toggle Sidebar</p>
							</TooltipContent>
						</Tooltip>
					</div>
					<span
						className={`font-semibold font-playfair text-lg transition-opacity duration-300 hover:opacity-100 ${
							!sidebarOpen
								? isHovered
									? 'opacity-100'
									: 'opacity-0'
								: 'opacity-100'
						}`}
					>
						BANTALICLINIC
					</span>
				</div>
				<div className='w-full flex flex-col '>
					<NavItem
						icon={<LayoutDashboardIcon size='20px' />}
						title='Dashboard'
						to='/dashboard'
						sidebarOpen={sidebarOpen}
						isHovered={isHovered}
					/>
					<NavItem
						icon={<LucideUserRound size='20px' />}
						title='Patients'
						to='/patients'
						sidebarOpen={sidebarOpen}
						isHovered={isHovered}
					/>

					<NavItem
						icon={<PieChart size='20px' />}
						title='Sales'
						to='/sales'
						sidebarOpen={sidebarOpen}
						isHovered={isHovered}
					/>
					<NavItem
						icon={<ClipboardList size='20px' />}
						title='Appointments'
						to='/appointments'
						sidebarOpen={sidebarOpen}
						isHovered={isHovered}
					/>
					<NavItem
						icon={<Calendar size='20px' />}
						title='Calendar'
						to='/calendar'
						sidebarOpen={sidebarOpen}
						isHovered={isHovered}
					/>
				</div>
			</div>
			<div className='flex flex-col'>
				<NavItem
					icon={<HelpCircleIcon size='20px' />}
					title='Help'
					to='/help'
					sidebarOpen={sidebarOpen}
					isHovered={isHovered}
				/>
				<NavItem
					icon={<Settings size='20px' />}
					title='Settings'
					to={`${
						auth.user.role === 'Admin'
							? '/settings/users'
							: 'settings/account'
					}`}
					sidebarOpen={sidebarOpen}
					isHovered={isHovered}
				/>
			</div>
		</div>
	)
}

export default Sidebar
