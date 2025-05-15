import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
const CallToAction = () => {
	return (
		<div className='bg-primary/20 flex justify-center items-center h-[300px] '>
			<section className='text-center '>
				<h2 className='text-3xl font-semibold mb-4'>
					Ready to Take Care of Your Eyes?
				</h2>
				<p className='text-md text-muted-foreground mb-8 max-w-2xl mx-auto'>
					Don't wait until you notice a problem with your vision.
					Regular eye exams are crucial for maintaining your eye
					health and catching potential issues early. Schedule your
					appointment today!
				</p>
				<Link to='/appointment'>
					<Button size='lg' className='px-8 py-6 text-lg'>
						Book Your Eye Exam Now
					</Button>
				</Link>
			</section>
		</div>
	)
}

export default CallToAction
