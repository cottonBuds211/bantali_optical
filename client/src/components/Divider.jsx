const Divider = ({ sidebarOpen }) => {
	return (
		<div
			className={`relative flex pb-2 items-center ${
				sidebarOpen ? 'px-1 py-0' : 'px-5'
			}`}
		>
			<div className='flex-grow border-t border-gray-200'></div>
		</div>
	)
}

export default Divider
