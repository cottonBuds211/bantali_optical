import { useSidebar } from '@/context/SideBarContext'
import { Link } from 'react-router-dom'

function NavItem({ icon, title, to, sidebarOpen, isHovered }) {
	const { setTopBarTitle, setIsSelected, isSelected } = useSidebar()
	const handleClick = () => {
		setIsSelected(title)
		setTopBarTitle(title)
	}
	return (
		<Link to={to} className='p-2' onClick={handleClick}>
			<div
				className={`flex w-full py-3 px-4 rounded-sm items-center  ${
					isSelected === title && 'text-primary font-bold '
				}`}
			>
				<div className={`flex items-center gap-2`}>
					{/* Icon */}
					<div className={`flex items-center `}>{icon}</div>
					{/* Text */}

					{/* <div
						className={` transition-opacity duration-300 ${
							sidebarOpen ? 'opacity-0' : 'opacity-100'
						}`}
					> */}
					<span
						className={`transition-all duration-300  text-sm  ${
							!sidebarOpen
								? isHovered
									? 'opacity-100'
									: 'opacity-0'
								: 'opacity-100'
						}`}
					>
						{!sidebarOpen ? (isHovered ? title : null) : title}
					</span>
					{/* </div> */}
				</div>
			</div>
		</Link>
	)
}

export default NavItem
