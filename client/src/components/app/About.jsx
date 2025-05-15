import five from '@/assets/5.jpg'
import gs from '@/assets/glassesgood.jpg'
import { Button } from '../ui/button'
import CallToAction from './CallToAction'
const About = () => {
	return (
		<section className='bg-white'>
			<div className='font-poppins font-light relative max-w-screen w-full text-white'>
				<img
					className='h-[300px] w-full object-cover brightness-50'
					src={gs}
					alt='Header image'
				/>
				<div className='absolute inset-0 flex items-center font-inter justify-center'>
					<h1 className='text-center text-white text-4xl sm:text-4xl md:text-5xl font-bold'>
						About
					</h1>
					<p className='mt-4 text-lg'></p>
				</div>
			</div>
			<div className='container flex flex-col gap-20 mb-10'>
				<div className='flex items-center justify-center mt-20'>
					<h1 className='text-center text-3xl font-semibold'>
						About Our Clinic
					</h1>
					<p className='mt-4 text-lg'></p>
				</div>
				<div className='flex flex-col md:flex-row items-center gap-5'>
					<div className='md:w-1/2 md:pl-12'>
						<h2 className='text-lg font-bold font-poppins text-heading tracking-wider'>
							Our Vision & Mission
						</h2>
						<p className='text-gray-600 ml-3 mb-6'>
							Our mission is to provide exceptional eye care
							services and personalized optical solutions that
							improve the vision and quality of life for every
							patient. We strive to deliver the highest standard
							of care with compassion and integrity, ensuring that
							each individual receives accurate diagnoses and
							effective treatments tailored to their unique needs.
						</p>
						<p className='text-gray-600 ml-3 mb-6'>
							Our vision is to be the leading optical clinic known
							for its excellence in eye care and innovative
							solutions. We aim to set the standard for
							patient-centered care, utilizing the latest
							technology and advancements in the field to provide
							the best possible outcomes. We are dedicated to
							fostering a community where every person values and
							maintains optimal eye health.
						</p>
						<p>
							<h2 className='text-lg font-bold font-font9 text-heading tracking-wider'>
								Our History
							</h2>
							<p className='text-gray-600 ml-3 mt-4 text-md font-font1 regular'>
								Established in 2020, our Optical Clinic has a
								long-standing tradition of delivering eye care
								services. We consistently provided exceptional
								care, building lasting relationships with the
								community and earning a reputation for
								excellence in the field of optometry.
							</p>
						</p>
					</div>
					<div className='md:w-1/2 mb-8 md:mb-0 h-[600px]'>
						<img
							src={five}
							alt='Our team at work'
							className='object-cover object-center h-full w-full rounded-lg shadow-lg '
						/>
					</div>
				</div>
			</div>
			<CallToAction />
		</section>
	)
}

export default About
