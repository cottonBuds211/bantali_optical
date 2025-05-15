import AppointmentFormRequest from '../forms/AppointmentFormRequest'
import gs from '@/assets/glassesgood.jpg'

const ContactUs = () => {
	return (
		<div className=' '>
			<div className='font-poppins font-light relative max-w-screen w-full text-white'>
				<img
					className='h-[300px] w-full object-cover brightness-50'
					src={gs}
					alt='Header image'
				/>
				<div className='absolute inset-0 flex items-center font-inter justify-center'>
					<h1 className='text-center text-white text-4xl sm:text-4xl md:text-5xl font-bold'>
						Appointment
					</h1>
					<p className='mt-4 text-lg'></p>
				</div>
			</div>
			{/* max-w-7xl */}
			<div className='container'>
				<div className='flex flex-col gap-y-24 py-16 lg:px-52 '>
					<p className='text-4xl font-normal '>
						Make an appointment with us
					</p>
					<AppointmentFormRequest />
				</div>
			</div>
		</div>
	)
}

export default ContactUs
