//import { FaPhone, FaEnvelope, FaClock,FaFacebook, FaLocationArrow} from 'react-icons/fa';
//import eye from '@assets/'

const Footer = () => {
	return (
		<footer
			className=' bg-[color:hsl(222.2,47.4%,11.2%)]  text-secondary/90 '
			id='footer'
		>
			<section className='flex flex-wrap justify-center py-20 gap-x-10 gap-y-8'>
				<div className='w-full sm:w-5/12 md:w-3/12 lg:w-4/12'>
					<div className='flex-shrink-0'>
						<a href='/'>
							<div className='flex font-playfair text-2xl items-center font-bold'>
								<a href='/'>Bantali Optical Clinic</a>
							</div>
						</a>
					</div>
				</div>

				{/* Services Column */}

				{/* Information Column */}
				<div className='w-full sm:w-4/12 text-sm md:w-2/12 lg:w-2/12'>
					<h3 className='font-bold mb-2 '>Quick Links</h3>
					<ul className='list-unstyled'>
						<li>
							<a href='#about' className='hover:text-white'>
								About Us
							</a>
						</li>
						<li>
							<a href='#' className='hover:text-white'>
								Privacy Policy
							</a>
						</li>
						<li>
							<a href='#' className='hover:text-white'>
								Terms of Service
							</a>
						</li>
						<li>
							<a href='#contact' className='hover:text-white'>
								Contact
							</a>
						</li>
					</ul>
				</div>

				{/* Contact Information Column */}
				<div className='w-full sm:w-4/12 text-sm md:w-3/12 lg:w-2/12 '>
					<h3 className='font-bold mb-2 '>Get In Touch</h3>
					<div className='gap-4'>
						<div className='flex mb-2'>
							{/* <FaLocationArrow title='Location' /> */}
							<p>
								<strong>Bantali Optical Clinic</strong>
								<br />
								Km. 5, Balili, La Trinidad, Benguet
							</p>
						</div>
						<div className='flex mb-2'>
							{/* <FaClock title='Clock' /> */}
							<p>Mon to Sat - 10:00 am to 6:00 pm</p>
						</div>
						<div className='flex mb-2'>
							{/* <FaPhone title='Phone' /> */}
							<p>(+01) 123 456 7890</p>
						</div>
						<div className='flex mb-2'>
							{/* <FaEnvelope /> */}
							<p>info@example.com</p>
						</div>
					</div>
				</div>
			</section>

			<section className='container text-center '>
				<p>
					&copy; Bantali Clinic. 2024 All rights reserved{' '}
					<a className=' transition-all border-primary hover:border-b-2' />
				</p>
			</section>
		</footer>
	)
}

export default Footer
