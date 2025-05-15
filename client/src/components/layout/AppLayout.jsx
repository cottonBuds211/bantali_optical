import { Outlet } from 'react-router-dom'
import Navbar from '../app/Navbar'
import Footer from '../app/Footer'
const AppLayout = () => {
	return (
		<div className='w-full flex flex-col'>
			<div className=''>
				<div className='sticky top-0 bg-primary/90 text-white z-50'>
					<Navbar />
				</div>
				<main className='w-full h-full flex flex-col'>
					<div className='font-inter flex-grow  '>
						<Outlet />
					</div>
				</main>
			</div>
			<footer className='bottom-0'>
				<Footer />
			</footer>
		</div>
	)
}

export default AppLayout
