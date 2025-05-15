import React from 'react'
import { Button } from '@/components/ui/button'
import { Glasses, Eye, Microscope } from 'lucide-react'
import one from '@/assets/1.jpg'
import three from '@/assets/3.jpg'
import ws from '@/assets/wavescan1.jpg'

import glasses from '@/assets/glasses.jpg'
import CallToAction from './CallToAction'

const serviceslist = [
	{
		id: 'consultation',
		image: one,
		title: 'Comprehensive Eye Exams',
		description:
			'Our CEX is designed to help you see the world more clearly. We specialize in detecting a wide range of eye conditions. Dignissim morbi orci ut lacinia tincidunt in rhoncus sit in donec luctus sit pharetra id vulputate commodo, nunc nibh tincidunt purus morbi diam, in netus tempus, eu, sed ultricies mi quam varius faucibus libero consectetur tellus et fusce sit adipiscing.',
		icon: Eye, // Add icon directly here as a component
	},
	{
		id: 'prescribe',
		icon: Glasses,
		image: glasses,
		title: 'Prescription Eyewear',
		description:
			'Wide selection of frames and lenses for your needs. Dignissim morbi orci ut lacinia tincidunt in rhoncus sit in donec luctus sit pharetra id vulputate commodo, nunc nibh tincidunt purus morbi diam, in netus tempus, eu, sed ultricies mi quam varius faucibus libero consectetur tellus et fusce sit adipiscing.',
	},
	{
		id: 'diagnose',
		icon: Microscope,
		image: three,
		title: 'Lens Fittings',
		description:
			'Expert fitting and prescription of contact lenses. Dignissim morbi orci ut lacinia tincidunt in rhoncus sit in donec luctus sit pharetra id vulputate commodo, nunc nibh tincidunt purus morbi diam, in netus tempus, eu, sed ultricies mi quam varius faucibus libero consectetur tellus et fusce sit adipiscing.',
	},
]

export default function Services() {
	return (
		<div className='w-full'>
			<div className='font-poppins font-light relative max-w-screen w-full text-white'>
				<img
					className='h-[300px] w-full object-cover brightness-50'
					src={ws}
					alt='Header image'
				/>
				<div className='absolute inset-0 flex items-center font-inter justify-center'>
					<h1 className='text-center text-white text-4xl sm:text-4xl md:text-5xl font-bold'>
						Services
					</h1>
					<p className='mt-4 text-lg'></p>
				</div>
			</div>
			<div className='flex items-center justify-center mt-20'>
				<h1 className='text-center text-3xl font-semibold'>
					We offer the following services
				</h1>
				<p className='mt-4 text-lg'></p>
			</div>
			<div className='py-16 bg-white space-y-12'>
				{serviceslist.map((sl, index) => (
					<div
						key={index}
						className='container m-auto px-6 text-gray-600 md:px-12 xl:px-6 mb-12'
					>
						<div
							className={`md:flex items-center gap-6 lg:gap-12 ${
								index % 2 === 0
									? 'flex-row'
									: 'flex-row-reverse'
							}`}
						>
							{/* Image container with fixed size */}
							<div className='max-w-[20rem] max-h-[20rem]'>
								<div className='service-image w-80 h-80 flex-shrink-0'>
									<img
										src={sl.image}
										alt={sl.title}
										loading='lazy'
										className='w-full h-full object-cover rounded-md'
									/>
								</div>
							</div>

							{/* Text content */}
							<div className='md:w-7/12 lg:w-6/12'>
								<h2 className='text-2xl text-gray-900 font-bold md:text-4xl'>
									{sl.title}
								</h2>
								<p className='mt-6 text-gray-600'>
									{sl.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<CallToAction />
			{/* <div className='mt-12 h-[400px] flex flex-col justify-center items-center text-center bg-primary/10'>
				<div className='mt-10'>
					<h1 className='text-4xl font-bold text-center mb-6'>
						Your Eye Care Journey
					</h1>
					<p className='text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto'>
						Embark on a journey to optimal eye health and
						crystal-clear vision with our comprehensive care
						pathway.
					</p>
				</div>
				<Button size='lg' className='px-8'>
					Begin Your Eye Care Journey
				</Button>
			</div> */}
		</div>
	)
}
