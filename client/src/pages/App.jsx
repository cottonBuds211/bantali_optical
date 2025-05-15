import About from '@/components/app/About'
import Footer from '@/components/app/Footer'
import Hero from '@/components/app/Hero'
import Navbar from '@/components/app/Navbar'
//import AppointmentFormRequest from '@/components/forms/AppointmentFormRequest'
import ServiceList from '@/components/app/ServiceList'
import ContactUs from '@/components/app/ContactUs'
import gs from '@/assets/glassesgood.jpg'
import WhyChooseUs from '@/components/app/WhyChooseUs'
const App = () => {
	return (
		//bg-[#FBFCFF]
		<div
			className='font-poppins 
		 font-light'
		>
			<div className='h-[100vh]  w-full absolute -z-10'>
				{/* <img
					src={gs}
					className=' object-cover object-top brightness-75  h-full w-full'
				/> */}
			</div>
			{/* Header */}
			{/* <div>
				<Navbar />
			</div> */}
			{/* Hero */}
			<div>
				<Hero />
			</div>

			{/* Services */}
			<div className='flex flex-col gap-10'>
				<div className='mt-28'>
					<section id='services'>
						<ServiceList />
					</section>
				</div>
				{/* <div>
					<section id='about'>
						<About />
					</section>
				</div> */}
				<div className=''>
					<WhyChooseUs />
				</div>
				{/* <div>
					<section id='contact'>
						<ContactUs />
					</section>
				</div> */}
			</div>

			{/* <div>
				<Footer />
			</div> */}
		</div>
	)
}

export default App
