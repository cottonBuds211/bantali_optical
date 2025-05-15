'use client'

import PageWrapper from '../PageWrapper'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	Users,
	Calendar,
	Package,
	DollarSign,
	ClipboardList,
	UserPlus,
	CalendarPlus,
	PackagePlus,
	Receipt,
	Search,
	Bell,
	FileText,
	BarChart,
	Settings,
	HandCoins,
	Archive,
	CalendarDays,
	ShieldCheck,
	Fingerprint,
	DatabaseBackup,
	ClipboardPlus,
	FileUp,
	Trash2,
	FileStack,
	ScanEye,
} from 'lucide-react'

const features = [
	{
		id: 'patient-records',
		title: 'Patient Record Management',
		description:
			'Efficiently manage and access comprehensive patient information with our advanced record system.',
		icon: Users,
		details: [
			{
				title: 'Add New Patient',
				description: [
					'Go to Patients page',
					'Click Add Patient button',
					'Fill up the form',
					'Click Submit',
				],
				icon: UserPlus,
			},
			{
				title: 'Update Records',
				description: [
					"Go to Patient's profile",
					`Click more options on the top right of the patients profile information then select EDIT`,
					"Edit the patient's information",
					'Click Submit to finish',
				],
				icon: ClipboardList,
			},
			{
				title: 'Archiving Patient',
				description: [
					"Go to Patient's profile",
					'Click more options on the top right of the patients profile information then select ARCHIVE',
					'Click Confirm to archive the patient',
				],
				icon: Archive,
			},
			{
				title: 'Record Patient Billing',
				description: [
					"Go to Patient's profile",
					`Go to Visitation Tab then click ADD VISITATION`,
					'Fill up all the forms',
					'Click Submit to finish',
				],
				icon: HandCoins,
			},

			{
				title: 'View Visitation History',
				description: [
					"Go to Patient's profile",
					`Go to Visitation Tab`,
					'Simply click a visitation to view',
				],
				icon: FileText,
			},
			{
				title: 'Search Functionality',
				description: [
					'Go to Patients page',
					`On the top left there is a search bar.`,
					'Simply search the name and it will filter the patients',
				],
				icon: Search,
			},
		],
	},
	{
		id: 'appointments',
		title: 'Appointment System',
		description:
			"Streamline your clinic's scheduling process with our robust appointment management system.",
		icon: Calendar,
		details: [
			{
				title: 'Schedule Appointments',
				description:
					'Use our appointment system to easily book new appointments. Choose from available time slots and assign them to patients.',
				icon: CalendarPlus,
			},

			{
				title: 'Manage Bookings',
				description:
					'Effortlessly view, reschedule, or cancel appointments. Our system automatically handles conflict resolution and waitlist management.',
				icon: Calendar,
			},
			{
				title: 'Archiving appointment',
				description:
					'Effortlessly view, reschedule, or cancel appointments. Our system automatically handles conflict resolution and waitlist management.',
				icon: Archive,
			},
			{
				title: 'Calendar Integration',
				description:
					'Effortlessly view, reschedule, or cancel appointments. Our system automatically handles conflict resolution and waitlist management.',
				icon: Calendar,
			},
			{
				title: 'Event List',
				description:
					'Effortlessly view, reschedule, or cancel appointments. Our system automatically handles conflict resolution and waitlist management.',
				icon: CalendarDays,
			},
		],
	},
	{
		id: 'inventory-sales',
		title: 'Inventory and Sales Tracking',
		description:
			"Efficiently manage your clinic's inventory and track sales with our integrated system.",
		icon: Package,
		details: [
			{
				title: 'Inventory Management',
				description:
					'Keep track of optical frames and out of stock inventory.',
				icon: PackagePlus,
			},
			{
				title: 'Add Inventory',
				description:
					'Keep track of optical frames and out of stock inventory.',
				icon: ClipboardPlus,
			},
			{
				title: 'Update Inventory',
				description:
					'Keep track of optical frames and out of stock inventory.',
				icon: FileUp,
			},
			{
				title: 'Delete Inventory',
				description:
					'Keep track of optical frames and out of stock inventory.',
				icon: Trash2,
			},
			{
				title: 'Sales Processing',
				description:
					'Easily record and process sales transactions for services, products, or medications. Our system automatically updates inventory levels and generates receipts.',
				icon: DollarSign,
			},
			{
				title: 'Inventory and Sales Monitoring',
				description:
					'Easily record and process sales transactions for services, products, or medications. Our system automatically updates inventory levels and generates receipts.',
				icon: ScanEye,
			},
			{
				title: 'Report Sales Generation',
				description:
					'Easily record and process sales transactions for services, products, or medications. Our system automatically updates inventory levels and generates receipts.',
				icon: FileStack,
			},
		],
	},
	{
		id: 'security-features',
		title: 'Security Features',
		description: 'Features that make the system secure.',
		icon: ShieldCheck,
		details: [
			{
				title: 'Authentication',
				description:
					'Keep track of optical frames and out of stock inventory.',
				icon: Fingerprint,
			},
			{
				title: 'Back-up & Restore',
				description:
					'Easily record and process sales transactions for services, products, or medications. Our system automatically updates inventory levels and generates receipts.',
				icon: DatabaseBackup,
			},
		],
	},
]
const Introduction = () => {
	return (
		<PageWrapper title={'Introduction'}>
			{' '}
			<div className='container mx-auto p-4 space-y-12'>
				<header className='text-center space-y-4'>
					<h1 className='text-4xl font-bold'>
						Records Management System
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Efficiently handle patient records, appointments,
						inventory, and sales in one integrated system.
					</p>
				</header>

				{features.map(feature => (
					<section key={feature.id} className='space-y-6'>
						<Card>
							<CardHeader className='flex flex-row items-center space-x-4'>
								<div className='bg-primary p-3 rounded-full'>
									<feature.icon className='w-8 h-8 text-primary-foreground' />
								</div>
								<div>
									<CardTitle className='text-2xl'>
										{feature.title}
									</CardTitle>
									<CardDescription className='text-lg'>
										{feature.description}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<Accordion
									type='single'
									collapsible
									className='w-full'
								>
									{feature.details.map((detail, index) => (
										<AccordionItem
											key={index}
											value={`item-${index}`}
										>
											<AccordionTrigger>
												<div className='flex items-center space-x-3'>
													<div className='bg-muted p-2 rounded-full'>
														<detail.icon className='w-4 h-4' />
													</div>
													<span>{detail.title}</span>
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<p className='text-muted-foreground pl-10'>
													{Array.isArray(
														detail.description
													) ? (
														<ul className='list-disc pl-5'>
															{detail.description.map(
																(
																	item,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																	>
																		{item}
																	</li>
																)
															)}
														</ul>
													) : (
														<p>
															{detail.description}
														</p>
													)}
												</p>
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</CardContent>
						</Card>
					</section>
				))}
			</div>
		</PageWrapper>
	)
}

export default Introduction
