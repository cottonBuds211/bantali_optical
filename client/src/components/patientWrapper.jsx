const PageWrapper = ({ children, title, button, description }) => {
	return (
		<>
			<div className='container flex flex-col mx-auto px-4 py-2 h-full'>
				{/* Header area */}
				<div className='flex justify-between items-center mb-4'>
					<div className='flex items-center gap-2'>
						{button && <div>{button}</div>}
						<div>
							<p className='text-2xl font-semibold '>{title}</p>
							<p>{description}</p>
						</div>
					</div>
				</div>

				{/* Body area */}
				<div className='flex-grow'>{children}</div>
			</div>
		</>
	)
}

export default PageWrapper
