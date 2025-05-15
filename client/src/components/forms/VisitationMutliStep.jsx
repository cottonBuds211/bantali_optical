'use client'

import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import billingFormSchema from '@/components/zodSchema/billingFormSchema'
import VisitServices from '@/services/visitServices'

import visitFormSchema from '@/components/zodSchema/visitationFormSchema'
import AuthContext from '@/context/AuthProvider'
import { useToast } from '@/components/ui/use-toast'

import BillingForm from '@/components/forms/BillingForm'
import BillingServices from '@/services/billingServices'
import SalesServices from '@/services/salesServices'
import VisitationForm from './VisitationForm'
import SalesForm from './SalesForm'
import ReviewForm from '../patients/ReviewForm'
import { ConfirmationDialog } from '../ConfirmationDialog'
import GenerateInvoiceDialog from '../patients/GenerateInvoiceDialog'
import { usePatient } from '@/context/PatientContext'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../PageWrapper'
import { ChevronLeft } from 'lucide-react'
import PatientServices from '@/services/patientServices'
import { add } from 'date-fns'

const VisitationMutliStep = () => {
	const [currentStep, setCurrentStep] = useState(0)
	const { patient } = usePatient()
	const { auth } = useContext(AuthContext)
	const { toast } = useToast()
	const visitServices = new VisitServices()
	const billingServices = new BillingServices()
	const salesServices = new SalesServices()
	const patientServices = new PatientServices()
	const [billing, setBilling] = useState(null)
	const [generateInvoice, setGenerateInvoice] = useState(false)
	const [lineItems, setLineItems] = useState([])
	const [addOns, setAddOns] = useState([])
	const [onConfirm, setIsConfirm] = useState(false)
	const navigate = useNavigate()
	const [lineItemsTotal, setLineItemsTotal] = useState(0)

	useEffect(() => {
		const total = lineItems.reduce(
			(sum, item) => sum + item.quantity * item.unitPrice,
			0
		)
		setLineItemsTotal(total)
	}, [lineItems])
	//console.log('Inventory cart', inventorySold)
	const [isFormReady, setIsFormReady] = useState(false) // Tracks when form is ready

	const steps = [
		{
			title: 'Eye Check up',
			description: 'Record the data from the eye check-up.',
		},
		{
			title: 'Frame Selection',
			description: 'Selection for frame, this part could be skipped.',
		},
		{
			title: 'Billing',
			description: 'Create an invoice for the patient.',
		},
		{
			title: 'Review and submit',
			description: 'Review the form you filled up.',
		},
	]

	const [visitData, setVisitData] = useState()

	const visitForm = useForm({
		resolver: zodResolver(visitFormSchema),
		defaultValues: {
			visitation_date: new Date().toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			}),
			visitation_time: new Date().toLocaleTimeString('en-US', {
				hour12: true,
				hour: 'numeric',
				minute: 'numeric',
			}),
			visit_data: {
				visualAcuityNearRight: '20/20',
				visualAcuityNearLeft: '20/20',
				visualAcuityDistanceRight: '20/20',
				visualAcuityDistanceLeft: '20/20',
				odSphere: '0.00',
				osSphere: '0.00',
				odCyl: '0.00',
				osCyl: '0.00',
				odAxis: '0',
				osAxis: '0',
				odAdd: '0.00',
				osAdd: '0.00',
				lensType: '',
				docNotes: '',
			},
		},
	})
	useEffect(() => {
		// Check if patient data is available on first render
		if (patient?.latest_eye_checkup) {
			visitForm.reset({
				visitation_date: new Date().toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}),
				visitation_time: new Date().toLocaleTimeString('en-US', {
					hour12: true,
					hour: 'numeric',
					minute: 'numeric',
				}),
				visit_data: {
					visualAcuityNearRight:
						patient.latest_eye_checkup.visualAcuityNearRight ||
						'20/20',
					visualAcuityNearLeft:
						patient.latest_eye_checkup.visualAcuityNearLeft ||
						'20/20',
					visualAcuityDistanceRight:
						patient.latest_eye_checkup.visualAcuityDistanceRight ||
						'20/20',
					visualAcuityDistanceLeft:
						patient.latest_eye_checkup.visualAcuityDistanceLeft ||
						'20/20',
					odSphere: patient.latest_eye_checkup.odSphere || '0.00',
					osSphere: patient.latest_eye_checkup.osSphere || '0.00',
					odCyl: patient.latest_eye_checkup.odCyl || '0.00',
					osCyl: patient.latest_eye_checkup.osCyl || '0.00',
					odAxis: patient.latest_eye_checkup.odAxis || '0',
					osAxis: patient.latest_eye_checkup.osAxis || '0',
					odAdd: patient.latest_eye_checkup.odAdd || '0.00',
					osAdd: patient.latest_eye_checkup.osAdd || '0.00',
					lensType: patient.latest_eye_checkup.lensType || '',
					docNotes: '',
				},
			})
			setIsFormReady(true) // Mark form as ready
		} else if (!isFormReady) {
			// If patient data is unavailable, allow the form to load with initial values
			setIsFormReady(true)
		}
	}, [patient, visitForm, isFormReady])

	const billingForm = useForm({
		resolver: zodResolver(billingFormSchema),
		defaultValues: {
			serviceFee: '',
			lensCost: '',
			itemCost: lineItemsTotal,
			discount: '',
			initialPayment: '',
		},
	})
	useEffect(() => {
		billingForm.setValue('itemCost', lineItemsTotal)
	}, [lineItemsTotal])
	const handleConfirm = async () => {
		const visitation_details = visitForm.getValues()
		try {
			const visit = await visitServices.addVisit({
				...visitData,
				user_id: auth.user.user_id,
				patient_id: patient.patient_id,
			})

			await patientServices.editPatient(
				{
					latest_eye_checkup: visitation_details.visit_data,
				},
				patient.patient_id
			)
			//Billing
			await billingServices.addBilling({
				...billing,
				user_id: auth.user.user_id,
				patient_id: patient.patient_id,
				visitation_id: visit.visitation_id,
			})

			//console.log('inventory', inventorySold)
			lineItems.forEach(async item => {
				console.log('item', item)
				try {
					await salesServices.createSale({
						quantity: item.quantity,
						totalPrice: item.quantity * parseFloat(item.unitPrice),
						saleDate: new Date(),
						item_id: item.item_id,
						patient_id: patient.patient_id,
						user_id: auth.user.user_id,
						billing_id: billing.billing_id,
					})
				} catch (e) {
					console.log(e)
				}
			})

			toast({
				title: 'Success',
				description: `Visit added for ${patient?.first_name}`,
				duration: 3000,
			})
			navigate(`/patients/profile/${patient.patient_id}`)
			visitForm.reset()
		} catch (e) {
			// Handle other errors
			console.error(e)
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: e.response?.data.error,
				duration: 3000,
			})
		}
	}
	const handleSubmit = () => {
		const visitData = visitForm.getValues()
		setVisitData(visitData)
		//setIsReviewOpen(true)
		setIsConfirm(true)
		//console.log(billing)
	}
	//console.log('billing', billingData)
	const handleNextStep = () => {
		if (currentStep === 0) {
			visitForm.trigger().then(isValid => {
				if (isValid) {
					setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
				}
			})
		} else if (currentStep === 1) {
			setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
		} else if (currentStep === 2) {
			billingForm.trigger().then(isValid => {
				if (isValid) {
					setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
					//const billingData = billingForm.getValues()
					const visitData = visitForm.getValues()

					setVisitData(visitData)
				}
			})
		} else {
			handleSubmit()
		}
	}
	if (!isFormReady) {
		// Render a loading spinner or placeholder until the form is ready
		return (
			<div className='flex justify-center items-center h-screen'>
				<l-ring
					size='40'
					stroke='5'
					bg-opacity='0'
					speed='2'
					color='gray'
				></l-ring>
			</div>
		)
	}
	return (
		<PageWrapper
			title={`Visitation for ${patient?.first_name}`}
			button={
				<Button
					className='rounded-full h-8 w-8'
					size='icon'
					variant='outline'
					onClick={() =>
						confirm('You will lose all data') &&
						navigate(`/patients/profile/${patient.patient_id}`)
					}
				>
					<ChevronLeft />
				</Button>
			}
		>
			<div className='flex w-full justify-center'>
				<div className='mx-6 w-full lg:mx-[20%]'>
					<CardHeader>
						<CardTitle></CardTitle>
						<CardDescription>
							Fill out the visitation form below to record a
							visit.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='mb-4'>
							<div className='flex justify-between mb-4'>
								{steps.map((step, index) => (
									<div
										key={index}
										className='flex items-center w-full'
									>
										<div
											className={cn(
												'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
												index <= currentStep
													? 'bg-primary text-primary-foreground'
													: 'bg-muted text-muted-foreground'
											)}
										>
											{index + 1}
										</div>
										{index < steps.length - 1 && (
											<div
												className={cn(
													'h-1 flex-grow mx-3 transition-all duration-300',
													index < currentStep
														? 'bg-primary'
														: 'bg-muted'
												)}
											/>
										)}
									</div>
								))}
							</div>

							<div className='mb-10'>
								<h2 className='text-3xl font-semibold '>
									{steps[currentStep].title}
								</h2>
								<CardDescription>
									{steps[currentStep].description}
								</CardDescription>
							</div>
						</div>
						{currentStep === 0 && (
							<VisitationForm
								visitForm={visitForm}
								handleSubmit={handleSubmit}
							/>
						)}

						{currentStep === 1 && (
							<>
								<SalesForm
									lineItems={lineItems}
									setLineItems={setLineItems}
								/>
							</>
						)}
						{currentStep === 2 && (
							<BillingForm
								setBilling={setBilling}
								billingForm={billingForm}
								lineItems={lineItems}
								addOns={addOns}
								setAddOns={setAddOns}
								setLineItems={setLineItems}
							/>
						)}
						{currentStep === 3 && (
							<ReviewForm
								patient={patient}
								visitData={visitData}
								billing={billing}
								addOns={addOns}
								lineItems={lineItems}
								setGenerateInvoice={setGenerateInvoice}
							/>
						)}
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button
							variant='outline'
							onClick={() =>
								setCurrentStep(Math.max(0, currentStep - 1))
							}
							disabled={currentStep === 0}
						>
							Previous
						</Button>
						<Button onClick={handleNextStep}>
							{currentStep === steps.length - 1
								? 'Submit'
								: 'Next'}
						</Button>
					</CardFooter>
					<GenerateInvoiceDialog
						generateInvoice={generateInvoice}
						setGenerateInvoice={setGenerateInvoice}
						billing={billing}
						lineItems={lineItems}
						patient={patient}
						addOns={addOns}
					/>
					<ConfirmationDialog
						title='Submit'
						description='This will create a visitation form the patient'
						confirmText='Confirm'
						onConfirm={handleConfirm}
						open={onConfirm}
						setOpen={setIsConfirm}
						destructive={false}
					/>
				</div>
			</div>
		</PageWrapper>
	)
}

export default VisitationMutliStep
