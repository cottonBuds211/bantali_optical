import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import one from '@/assets/2.jpg'
const Hero = () => {
	return (
		<div className='container w-full grid grid-cols-2 text-black items-center h-[80vh] gap-20'>
			<div className='grid col-span-1 grid-cols-10 gap-4 mt-14 space-x-14'>
				<div className='col-span-10 space-y-20 '>
					<p className=' text-xl lg:text-8xl font-playfair'>
						Perfect <span className='text-primary'>vision</span>,
						perfect <span className='text-primary'>life</span>.
					</p>
					<div className=' grid grid-cols-2 gap-5'>
						<div className='col-span-1'>
							<div className='grid gap-4'>
								<Separator />

								<p className='font-light font-poppins'>
									With over 7 years of experience. Our clinic
									has provided thousands of eye cares services
								</p>
								<Separator />
								{/* <p className='font-light font-poppins'>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</p> */}
							</div>
						</div>
					</div>
					<div className=' '>
						<Link to={'/appointment'}>
							<Button className='bg-primary text-secondary rounded-md p-7 text-md font-regular font-inter'>
								Book an appointment
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<div className='col-span-1 flex h-[550px] shadow-md mt-16 w-fit rounded-3xl overflow-hidden'>
				<img src={one} className='h-fit  object-contain' />
			</div>
		</div>
	)
}

export default Hero
