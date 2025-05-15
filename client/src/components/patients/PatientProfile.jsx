import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import PageWrapper from '../PageWrapper'
import LinkButton from '../LinkButton'
import PatientProfileInfoCard from './PatientProfileInfoCard'
import VisitationTab from './VisitationTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import PrescriptionTab from './PrescriptionTab'

import { Button } from '../ui/button'
import InvoiceTab from './InvoiceTab'
import { usePatient } from '@/context/PatientContext'
import { useNavigate } from 'react-router-dom'

const PatientProfile = () => {
	const { patient } = usePatient()
	const navigate = useNavigate()
	// Function to toggle between views

	//console.log(patient)
	//Make request to server

	//var to store patient obj
	return (
		<PageWrapper
			title={'Patient Profile'}
			button={
				<Button
					className='rounded-full h-8 w-8'
					size='icon'
					variant='outline'
					onClick={() => navigate(`/patients/`)}
				>
					<ChevronLeft />
				</Button>
			}
		>
			<div className=' mx-auto p-4 space-y-6'>
				{patient && <PatientProfileInfoCard />}

				<div className=' flex flex-col h-full gap-3 w-full'>
					<Tabs defaultValue='visitations'>
						<TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
							<TabsTrigger
								value='visitations'
								className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
							>
								Visitations
							</TabsTrigger>
							<TabsTrigger
								value='prescriptions'
								className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
							>
								Prescriptions
							</TabsTrigger>
							<TabsTrigger
								value='invoice'
								className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
							>
								Invoice
							</TabsTrigger>
						</TabsList>
						<TabsContent value='visitations' className='h-full'>
							<VisitationTab />
						</TabsContent>
						<TabsContent value='prescriptions'>
							<PrescriptionTab />
						</TabsContent>
						<TabsContent value='invoice'>
							<InvoiceTab />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</PageWrapper>
	)
}

export default PatientProfile
