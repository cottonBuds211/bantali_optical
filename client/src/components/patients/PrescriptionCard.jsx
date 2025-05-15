import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Glasses } from 'lucide-react'
import ViewPrescriptionDialog from './ViewPrescriptionDialog'
import { useState } from 'react'
const PrescriptionCard = ({ visit }) => {
	// const prescriptionDate = new Date(prescription?.prescription_date)
	// const now = new Date()
	const [dialogOpen, setDialogOpen] = useState(false)
	const handleView = () => {
		setDialogOpen(!dialogOpen)
	}

	return (
		<>
			<Card
				key={visit.visit_id}
				className='hover:bg-secondary/90 cursor-pointer'
				onClick={() => handleView()}
			>
				<CardHeader>
					<div className='flex justify-between'>
						<div>
							<CardTitle className='text-lg flex items-center'>
								<Glasses className='w-5 h-5 mr-2' />
								Prescription {visit.visitation_date}
							</CardTitle>
							<CardDescription>
								Type: {visit.visit_data.lensType}
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='lg:mx-20'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Eye</TableHead>
									<TableHead>Sphere</TableHead>
									<TableHead>Cylinder</TableHead>
									<TableHead>Axis</TableHead>
									<TableHead>Add</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>Right (OD)</TableCell>
									<TableCell>
										{visit.visit_data.odSphere}
									</TableCell>
									<TableCell>
										{visit.visit_data.odCyl}
									</TableCell>
									<TableCell>
										{visit.visit_data.odAxis}
									</TableCell>
									<TableCell>
										{visit.visit_data.odAdd}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Left (OS)</TableCell>
									<TableCell>
										{visit.visit_data.osSphere}
									</TableCell>
									<TableCell>
										{visit.visit_data.osCyl}
									</TableCell>
									<TableCell>
										{visit.visit_data.osAxis}
									</TableCell>
									<TableCell>
										{visit.visit_data.osAdd}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
					<div className='mt-4 text-sm text-muted-foreground'>
						<p>PD (Distance): {visit.visit_data.pdDistance} mm</p>
						<p>PD (Near): {visit.visit_data.pdNear} mm</p>
					</div>
				</CardContent>
			</Card>
			<ViewPrescriptionDialog
				visit={visit}
				handleView={handleView}
				dialogOpen={dialogOpen}
			/>
		</>
	)
}

export default PrescriptionCard
