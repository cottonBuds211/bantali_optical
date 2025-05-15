import Topbar from '../global/Topbar'
import Sidebar from '../global/Sidebar'
import { Outlet } from 'react-router-dom'
const DefaultLayout = () => {
	return (
		<div className='relative flex '>
			<Sidebar />

			<div className='relative flex flex-col flex-grow w-full '>
				<Topbar />
				<main className='w-full h-full flex flex-col'>
					<div className='font-inter flex-grow sm:p-4 '>
						<Outlet />
					</div>
				</main>
				<footer className='bottom-0'>
					<div className='flex justify-center text-muted-foreground'>
						<p>©Bantali Clinic. 2024 All rights reserved</p>
					</div>
				</footer>
			</div>
		</div>
	)
}

export default DefaultLayout
