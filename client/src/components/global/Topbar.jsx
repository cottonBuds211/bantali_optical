import { Moon, Sun, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/ThemeProvider'
import useLogout from '@/hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import NotificationButton from '../NotificationButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useContext } from 'react'
import AuthContext from '@/context/AuthProvider'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebar } from '@/context/SideBarContext'
const Topbar = () => {
	const { topBarTitle } = useSidebar()
	const { auth } = useContext(AuthContext)
	const { setTheme } = useTheme()
	const navigate = useNavigate()
	const logout = useLogout()
	const signOut = async () => {
		await logout()
		navigate('/')
	}
	return (
		<div className='sticky top-0 font-inter backdrop-blur-sm flex flex-row justify-between items-center  pl-5 border-b bg-background/90 z-50'>
			{/* <div className='sm: invisible'>
					<BreadCrumb setSelectedItem={setSelectedItem} />
				</div> */}
			<p className='text-md font-semibold'>{topBarTitle}</p>
			<div className='px-4 py-2 flex flex-row justify-center gap-2 items-center'>
				<p className='text-sm mx-3 sm: collapse'>Welcome, Admin</p>

				<NotificationButton />

				<DropdownMenu>
					<Tooltip>
						<TooltipTrigger>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
									<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
									<span className='sr-only'>
										Toggle theme
									</span>
								</Button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<p>Theme</p>
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => setTheme('light')}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<Tooltip>
						<TooltipTrigger>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='flex gap-2'>
									<Avatar className='h-7 w-7 flex justify-center items-center bg-primary/50'>
										<User className='rounded-full  p-1' />
										{/* <AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback> */}
									</Avatar>
									<p className='text-sm font-normal'>
										{auth.user.name}
									</p>
									<TriangleDownIcon />
								</Button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<p>Logout</p>
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={signOut}>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
export default Topbar
