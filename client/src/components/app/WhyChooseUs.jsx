import {
	Share,
	Twitter,
	Facebook,
	MessageCircle,
	FacebookIcon,
} from 'lucide-react'
import { Button } from '../ui/button'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
	CardDescription,
} from '../ui/card'
import one from '@/assets/1.jpg'
import two from '@/assets/2.jpg'
import three from '@/assets/3.jpg'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import CallToAction from './CallToAction'

const whyChooseUs = [
	{
		id: 1,
		title: 'Years of Service',
		description:
			'Community health and vision care to Benguet for over 20 years',
		image: one,
	},
	{
		id: 2,
		title: 'Experienced Optometrists',
		description:
			'Brings years of experience in diagnosing and treating various eye conditions.',
		image: two,
	},
	{
		id: 3,
		title: 'Personalized Care',
		description:
			'We understand that every patient is unique and tailor our services accordingly.',
		image: three,
	},
	// {
	// 	id: 4,
	// 	title: 'Comfortable Environment',
	// 	description:
	// 		'Our clinic provides a welcoming atmosphere to make you feel at ease.',
	// 	image: four,
	// },
]
const reviews = [
	{
		id: 1,
		name: 'Alice Johnson',
		avatar: '/placeholder.svg?height=40&width=40',
		rating: 5,
		text: 'Excellent service! The staff was very professional and my new glasses are perfect.',
	},
	{
		id: 2,
		name: 'Bob Smith',
		avatar: '/placeholder.svg?height=40&width=40',
		rating: 4,
		text: 'Great experience overall. The eye exam was thorough and the frame selection was impressive.',
	},
	{
		id: 3,
		name: 'Carol White',
		avatar: '/placeholder.svg?height=40&width=40',
		rating: 5,
		text: "I'm very satisfied with my new contact lenses. The optometrist was very patient and helpful.",
	},
	{
		id: 4,
		name: 'David Brown',
		avatar: '/placeholder.svg?height=40&width=40',
		rating: 4,
		text: 'Quick and efficient service. The staff was friendly and the prices were reasonable.',
	},
]

const faqs = [
	{
		question: 'How often should I have an eye exam?',
		answer: 'For adults with no symptoms or risk factors, an eye exam every 1 to 2 years is generally recommended. However, if you wear glasses or contact lenses, have a family history of eye disease, or have a chronic condition like diabetes, you may need more frequent exams. Children should have their first comprehensive eye exam at 6 months old, then at 3 years old, and before starting school.',
	},
	{
		question:
			"What's the difference between an optometrist and an ophthalmologist?",
		answer: 'An optometrist is a primary eye care provider who performs eye exams, prescribes corrective lenses, and can diagnose and treat many eye conditions. An ophthalmologist is a medical doctor who specializes in eye and vision care, can perform eye surgery, and often treats more complex eye conditions. Both play crucial roles in maintaining your eye health.',
	},
	{
		question: 'Are contact lenses safe to wear?',
		answer: "When used properly, contact lenses are very safe. However, they do carry a risk of eye infections if not cleaned and stored properly, or if worn for too long. It's crucial to follow your eye care professional's instructions on lens care and replacement schedule. Some people may find that they're not suitable for contact lenses due to dry eyes or other conditions.",
	},
	{
		question: 'Can prolonged screen time damage my eyes?',
		answer: "Prolonged screen time doesn't permanently damage your eyes, but it can cause eye strain, dry eyes, and temporary blurred vision. To reduce these effects, follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for at least 20 seconds. Also, ensure your screen is positioned correctly and the room is well lit.",
	},
	{
		question: 'What are the signs that a child might need glasses?',
		answer: 'Signs that a child might need glasses include squinting, sitting too close to the TV or holding books very close, frequent eye rubbing, complaining of headaches or eye pain, having difficulty in school, or showing signs of a crossed or wandering eye. However, many children may not show obvious signs, which is why regular eye exams are important.',
	},
]

const WhyChooseUs = () => {
	return (
		<div className=' flex flex-col gap-16'>
			<div className='container flex justify-between items-start '>
				<div>
					<p className='text-3xl font-semibold'>Why Choose Us</p>
					<div className='flex flex-wrap gap-2 mb-4 text-sm'>
						<span className='text-sm text-gray-500'>#Clinic</span>
						<span className='text-sm text-gray-500'>
							#Ophthalmology
						</span>
						<span className='text-sm text-gray-500'>
							#Truthfulness
						</span>
						<span className='text-sm text-gray-500'>#Trust</span>
					</div>
				</div>
				<div className='flex gap-2'>
					<Button size='icon' variant='outline' aria-label='Share'>
						<Share className='h-4 w-4' />
					</Button>

					<Button
						size='icon'
						variant='outline'
						aria-label='Share on Twitter'
					>
						<TwitterLogoIcon className='h-4 w-4' />
					</Button>
					<Button
						size='icon'
						variant='outline'
						aria-label='Share on Facebook'
					>
						<FacebookIcon className='h-4 w-4' />
					</Button>
					<Button
						size='icon'
						variant='outline'
						aria-label='Share on WhatsApp'
					>
						<MessageCircle className='h-4 w-4' />
					</Button>
				</div>
			</div>
			<div className='container grid grid-cols-1 md:grid-cols-3 relative gap-5 '>
				{whyChooseUs.map((item, index) => (
					<Card key={item.id}>
						<CardContent className='p-0  mb-3'>
							<img
								src={item.image}
								alt={item.title}
								className='w-full object-cover'
							/>
						</CardContent>
						<CardFooter className='flex flex-col items-start'>
							<CardTitle className='text-lg font-semibold mb-1'>
								{String(index + 1).padStart(2, '0')} /{' '}
								{item.title}
							</CardTitle>
							<CardDescription>
								{item.description}
							</CardDescription>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className=' container'>
				<div className='mb-10'>
					<p className='text-3xl font-semibold'>
						Frequently Asked Questions
					</p>
					<p className='text-muted-foreground text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Numquam, cupiditate soluta repellendus animi iste
						molestiae
					</p>
				</div>
				<div className=' w-full max-w-3xl mx-auto'>
					<CardContent>
						<Accordion type='single' collapsible className='w-full'>
							{faqs.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
								>
									<AccordionTrigger className='text-left'>
										{faq.question}
									</AccordionTrigger>
									<AccordionContent>
										<p className='text-muted-foreground'>
											{faq.answer}
										</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</div>
			</div>
			<div className='container'>
				<div className='flex flex-col mb-12'>
					<p className='text-3xl font-semibold '>
						What clients say about us
					</p>
					<p className='text-muted-foreground text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Numquam, cupiditate soluta repellendus animi iste
						molestiae
					</p>
				</div>
				<Carousel className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto'>
					<CarouselContent>
						{reviews.map(review => (
							<CarouselItem key={review.id}>
								<Card className='mx-1'>
									<CardContent className='flex flex-col  items-center p-6'>
										<Avatar className='w-24 h-24 mr-4'>
											<AvatarImage
												src={review.avatar}
												alt={review.name}
											/>
											<AvatarFallback>
												{review.name
													.split(' ')
													.map(n => n[0])
													.join('')}
											</AvatarFallback>
										</Avatar>
										<div className='flex flex-col justify-center'>
											<h3 className='font-semibold text-center text-lg mb-2'>
												{review.name}
											</h3>

											<p className='text-center text-sm text-gray-600 mb-2'>
												<span className='italic'>
													"{review.text}"
												</span>
											</p>
											<div className='flex mb-2 justify-center'>
												Happy Client
											</div>
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
			<CallToAction />
		</div>
	)
}

export default WhyChooseUs
