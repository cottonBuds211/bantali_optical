import { Glasses, Eye, Microscope } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'

const services = [
	{
		icon: Eye,
		title: 'Eye Exams',
		description: 'Thorough evaluation of your eye health and vision.',
	},
	{
		icon: Glasses,
		title: 'Prescription Eyewear',
		description: 'Wide selection of frames and lenses for your needs.',
	},

	{
		icon: Microscope,
		title: 'Frame Selection',
		description: 'Expert fitting and prescription of lenses.',
	},
]

const ServiceList = () => {
	return (
		<>
			<div className='container flex flex-col gap-5 mx-auto px-4'>
				<div className=''>
					<h2 className='text-3xl font-semibold'>Our Services</h2>
					<div className='flex flex-wrap gap-2  text-sm'>
						<span className='text-sm text-gray-500'>#EyeExam</span>
						<span className='text-sm text-gray-500'>#EyeWear</span>
						<span className='text-sm text-gray-500'>
							#FrameSlection
						</span>
					</div>
				</div>
				<div className='flex flex-col md:flex-row justify-center items-center space-x-12'>
					{services.map((service, index) => (
						<Card
							key={index}
							className='text-center max-w-xs w-full border-none'
						>
							<div className='flex flex-col bg-primary/10 items-center p-10 hover:bg-secondary/90 gap-3'>
								<div>
									<div className='w-12 h-12  rounded-full flex items-center justify-center '>
										<service.icon className='w-10 h-10 text-primary' />
									</div>
								</div>
								<div>
									<h3 className='text-lg font-semibold mb-2'>
										{service.title}
									</h3>
									<p className='text-gray-600 text-sm'>
										{service.description}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default ServiceList
