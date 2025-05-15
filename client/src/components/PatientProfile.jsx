import { useState, useEffect, createContext } from 'react'
import { ChevronLeft } from 'lucide-react'
import PageWrapper from './patientWrapper'
import LinkButton from './LinkButton'
import PatientProfileInfoCard from './PatientProfileInfoCard'
import VisitationTab from './VisitationTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import PrescriptionTab from './PrescriptionTab'
import PatientServices from '@/services/patientServices'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

export const PatientContext = createContext({})

const PatientProfile = () => {
	const params = useParams()
	const { toast } = useToast()
	const navigate = useNavigate()
	const location = useLocation()
	const patientServices = new PatientServices()
	const [successPatient, setSuccessPatient] = useState(false)
	const [patient, setPatient] = useState(null)
	//Make request to server
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal
		const getPatient = async () => {
			try {
				const patient = await patientServices.getPatient(
					params.id,
					signal
				)
				//console.log(patient)
				isMounted && setPatient(patient)
			} catch (err) {
				//console.error(err)
				if (err.code !== 'ERR_CANCELED') {
					toast({
						title: 'Session Expired',
						description:
							'Your session has expired please log-in again!',
					})
					navigate('/login', {
						state: { from: location },
						replace: true,
					})
				}
			}
		}

		getPatient()

		return () => {
			isMounted = false
			controller.abort()
			setSuccessPatient(null)
		}
	}, [successPatient])

	//var to store patient obj
	return (
		<PatientContext.Provider value={{ patient, setSuccessPatient }}>
			<PageWrapper
				title={'Patient Profile'}
				button={<LinkButton icon={<ChevronLeft />} />}
			>
				<div className='flex lg:flex-row md:flex-col flex-col h-full gap-3'>
					<div className='flex flex-col space-y-2'>
						{patient && <PatientProfileInfoCard />}
					</div>
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
							</TabsList>
							<TabsContent value='visitations' className='h-full'>
								<VisitationTab />
							</TabsContent>
							<TabsContent value='prescriptions'>
								<PrescriptionTab />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</PageWrapper>
		</PatientContext.Provider>
	)
}

export default PatientProfile
